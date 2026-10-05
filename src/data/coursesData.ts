import { Formation } from '../types.ts';

export const FORMATIONS_DATA: Formation[] = [
  {
    id: 'aws-saa-c03',
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    subtitle: 'Preparatório completo para o padrão ouro de arquitetura distribuída resiliente e escalável na nuvem AWS.',
    category: 'certifications',
    provider: 'AWS',
    level: 'Intermediário',
    duration: '80 horas de estudo sugeridas (8 a 10 semanas)',
    examCode: 'SAA-C03',
    badgeColor: 'amber',
    technologies: ['AWS IAM', 'EC2', 'S3', 'VPC', 'RDS', 'Aurora', 'DynamoDB', 'ECS/Fargate', 'Lambda', 'SQS/SNS', 'CloudWatch'],
    description: 'A certificação SAA-C03 valida a capacidade do profissional de projetar soluções em nuvem econômicas, resilientes, de alto desempenho e otimizadas para segurança. Esta trilha cobre cada um dos 4 domínios avaliados no exame com ênfase prática em trade-offs de engenharia.',
    targetAudience: 'Engenheiros de software, arquitetos de soluções, analistas de sistemas e DevOps que desejam liderar decisões técnicas na AWS.',
    prerequisites: [
      'Conhecimentos básicos de redes (IP, DNS, sub-redes, CIDR).',
      'Noções gerais de computação cliente-servidor e bancos de dados SQL/NoSQL.'
    ],
    skillsLearned: [
      'Projetar topologias VPC altamente disponíveis com sub-redes públicas e privadas, NAT Gateways e Transit Gateway.',
      'Dimensionar armazenamento com Amazon S3 (Lifecycle Policies, S3 Glacier, versionamento) e EBS (gp3, io2).',
      'Criar arquiteturas desacopladas baseadas em eventos usando SQS FIFO, SNS Fanout e EventBridge.',
      'Configurar bancos de dados com failover multi-AZ, read replicas e caching com ElastiCache (Redis).',
      'Implementar governança de identidade e segurança granular via IAM Policies, Roles e KMS.'
    ],
    modules: [
      {
        title: 'Módulo 1: Fundamentos de Segurança, IAM & Rede (VPC)',
        hours: '18h',
        topics: [
          'IAM: Policies least privilege, Roles para EC2, SCPs e MFA Enforcement',
          'VPC profunda: CIDRs, Subnets, Route Tables, Internet & NAT Gateways',
          'Segurança de perímetro: Security Groups com restrição de porta vs Network ACLs stateless',
          'Conectividade avançada: VPC Peering, VPC Endpoints (Gateway e Interface) e AWS PrivateLink'
        ]
      },
      {
        title: 'Módulo 2: Computação Elástica, Containers e Serverless',
        hours: '20h',
        topics: [
          'EC2: Famílias de instâncias, Spot Instances, Savings Plans e Auto Scaling Groups (ASG)',
          'Load Balancers: Application Load Balancer (ALB) vs Network Load Balancer (NLB)',
          'Containers em produção: AWS ECS com Fargate serverless vs Elastic Kubernetes Service (EKS)',
          'Serverless: AWS Lambda (concurrency, cold starts), API Gateway (REST, HTTP) e Step Functions'
        ]
      },
      {
        title: 'Módulo 3: Camada de Armazenamento, Bancos de Dados & Cache',
        hours: '22h',
        topics: [
          'Armazenamento em bloco e objeto: EBS types, EFS para volumes compartilhados e S3 Storage Classes',
          'Bancos Relacionais: Amazon RDS Multi-AZ, Read Replicas e Amazon Aurora Serverless v2',
          'Bancos NoSQL: Amazon DynamoDB (Partition Keys, GSI, LSI, TTL e DynamoDB Streams)',
          'Otimização de Latência: Amazon ElastiCache (Redis/Memcached) e CloudFront com CDN edge'
        ]
      },
      {
        title: 'Módulo 4: Alta Disponibilidade, Recuperação de Desastres e Custos',
        hours: '20h',
        topics: [
          'Estratégias de Disaster Recovery: Backup & Restore, Pilot Light, Warm Standby e Multi-Site Active-Active',
          'Mensageria: SQS (DLQ, Visibility Timeout), SNS e Kinesis Data Streams',
          'Monitoramento e Auditoria: Amazon CloudWatch (Métricas, Logs, Alarmes) e AWS CloudTrail',
          'Simulados direcionados de 65 questões e resolução de armadilhas clássicas da prova'
        ]
      }
    ],
    examDomains: [
      { domain: 'Domínio 1: Projetar Arquiteturas Seguras', weight: '30%', description: 'IAM, criptografia KMS em repouso e em trânsito, isolamento VPC e segurança em camadas.' },
      { domain: 'Domínio 2: Projetar Arquiteturas Resilientes', weight: '26%', description: 'Tolerância a falhas, multi-AZ, desacoplamento por filas e estratégias de Disaster Recovery.' },
      { domain: 'Domínio 3: Projetar Arquiteturas de Alto Desempenho', weight: '24%', description: 'Caching, bancos com baixa latência, computação elástica e storage throughput.' },
      { domain: 'Domínio 4: Projetar Arquiteturas Otimizadas para Custo', weight: '20%', description: 'Seleção adequada de instâncias, S3 lifecycle, Aurora Serverless e redução de transferência de dados.' }
    ],
    officialGuideUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    relatedPageId: 'cloud',
    weeklyPlan: [
      { week: 'Semanas 1-2', focus: 'Segurança, IAM e Arquitetura VPC', deliverables: 'Criar VPC multi-AZ funcional com ALB, instâncias privadas e NAT Gateway.' },
      { week: 'Semanas 3-4', focus: 'Computação, Auto Scaling e Serverless', deliverables: 'Configurar ASG acoplado ao ALB e Lambda processando eventos S3.' },
      { week: 'Semanas 5-6', focus: 'Bancos de Dados, DynamoDB e S3 Lifecycle', deliverables: 'Configurar RDS com replica de leitura e bucket S3 com transição para Glacier.' },
      { week: 'Semanas 7-8', focus: 'Desacoplamento, DR e Bateria de Simulados', deliverables: 'Fazer 4 simulados completos alcançando nota superior a 80%.' }
    ]
  },
  {
    id: 'azure-az-204',
    title: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
    subtitle: 'Preparatório focado no desenvolvimento de ponta a ponta de soluções corporativas na nuvem Microsoft Azure.',
    category: 'certifications',
    provider: 'Microsoft Azure',
    level: 'Intermediário',
    duration: '70 horas de estudo sugeridas (7 a 9 semanas)',
    examCode: 'AZ-204',
    badgeColor: 'sky',
    technologies: ['Azure App Service', 'Azure Functions', 'Cosmos DB', 'Azure Blob Storage', 'Microsoft Entra ID', 'Key Vault', 'Event Grid', 'Service Bus'],
    description: 'O exame AZ-204 mede a capacidade técnica de criar soluções em nuvem seguras e escaláveis utilizando os principais serviços de PaaS da Microsoft. Fundamental para desenvolvedores .NET, Java, Python ou Node.js que implementam soluções na nuvem corporativa.',
    targetAudience: 'Desenvolvedores de software de qualquer stack que projetam, constroem, testam e mantêm aplicações nativas da nuvem no Azure.',
    prerequisites: [
      'Pelo menos 1 a 2 anos de experiência profissional com programação (C#, Java, Python ou JavaScript).',
      'Familiaridade básica com o portal do Azure, Azure CLI e PowerShell.'
    ],
    skillsLearned: [
      'Criar e configurar Azure App Service Web Apps, deployment slots e planos de dimensionamento.',
      'Desenvolver Azure Functions orientadas a gatilhos (Triggers) e vinculações (Bindings).',
      'Integrar autenticação segura e autorização com Microsoft Entra ID (MSAL) e Azure Key Vault.',
      'Modelar e particionar dados escaláveis no Azure Cosmos DB (API NoSQL).',
      'Implementar soluções assíncronas baseadas em eventos com Azure Service Bus e Event Grid.'
    ],
    modules: [
      {
        title: 'Módulo 1: Soluções de Computação do Azure',
        hours: '18h',
        topics: [
          'Azure App Service: Planos, Configurações de Aplicativo, Deployment Slots e Zero-Downtime deploy',
          'Azure Container Apps (ACA) e Azure Container Instances (ACI) para microserviços em contêineres',
          'Azure Functions: Triggers (HTTP, Timer, Blob, Cosmos, Service Bus) e In/Out Bindings',
          'Durable Functions: Padrões de orquestração (Function Chaining, Fan-out/Fan-in, Monitor)'
        ]
      },
      {
        title: 'Módulo 2: Armazenamento e Cosmos DB',
        hours: '16h',
        topics: [
          'Azure Blob Storage: Blobs de blocos, Camadas (Hot, Cool, Cold, Archive) e SAS Tokens com permissão temporária',
          'Azure Cosmos DB: Escolha de Partition Key, Request Units (RU/s), Consistência de Dados e Change Feed',
          'Manipulação programática via SDK oficial em C# (.NET) ou Python'
        ]
      },
      {
        title: 'Módulo 3: Segurança do Azure e Gerenciamento de Identidade',
        hours: '16h',
        topics: [
          'Microsoft Entra ID (antigo Azure AD): Registro de aplicativos, Escopos OAuth2 e fluxo de autorização MSAL',
          'Managed Identities (System-assigned e User-assigned): Conexão com recursos sem credenciais hardcoded',
          'Azure Key Vault: Segredos, Chaves criptográficas e Certificados com RBAC integrado',
          'Azure App Configuration: Feature Flags dinâmicas e centralização de propriedades'
        ]
      },
      {
        title: 'Módulo 4: Monitoramento, Caching e Comunicação Orientada a Eventos',
        hours: '20h',
        topics: [
          'Azure Redis Cache: Estratégias de cache distribuído, expiração e clustering',
          'Mensageria: Azure Service Bus (Filas, Tópicos, Assinaturas, Dead-lettering) vs Storage Queues',
          'Event Grid e Event Hubs para ingestão em larga escala de telemetria',
          'Application Insights: Telemetria distribuída, métricas customizadas e Log Analytics'
        ]
      }
    ],
    examDomains: [
      { domain: 'Desenvolver soluções de computação do Azure', weight: '25-30%', description: 'App Service, Functions, Container Apps e orquestrações duráveis.' },
      { domain: 'Desenvolver para o armazenamento do Azure', weight: '15-20%', description: 'Cosmos DB (RU/s e particionamento) e Blob Storage (SAS tokens).' },
      { domain: 'Implementar a segurança do Azure', weight: '20-25%', description: 'Microsoft Entra ID, Managed Identities e Azure Key Vault.' },
      { domain: 'Monitorar, solucionar problemas e otimizar', weight: '15-20%', description: 'Azure Cache for Redis e Application Insights.' },
      { domain: 'Conectar-se e consumir serviços do Azure e de terceiros', weight: '15-20%', description: 'Service Bus, Event Grid e API Management.' }
    ],
    officialGuideUrl: 'https://learn.microsoft.com/certifications/exams/az-204/',
    relatedPageId: 'cloud',
    relatedArticleId: 'dotnet-minimal-apis',
    weeklyPlan: [
      { week: 'Semanas 1-2', focus: 'App Service, Slots e Functions com Bindings', deliverables: 'Publicar API com deployment slot e função disparada por Blob.' },
      { week: 'Semanas 3-4', focus: 'Cosmos DB e Blob Storage com SAS', deliverables: 'CRUD com Cosmos DB SDK e geração de SAS Token dinâmico.' },
      { week: 'Semanas 5-6', focus: 'Entra ID, Managed Identities e Key Vault', deliverables: 'Conectar API ao Key Vault sem senhas usando Managed Identity.' },
      { week: 'Semanas 7-8', focus: 'Service Bus, App Insights e Simulados Oficiais', deliverables: 'Implementar fila de mensagens e simular prova AZ-204.' }
    ]
  },
  {
    id: 'azure-az-305',
    title: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)',
    subtitle: 'Certificação de nível Expert para desenhar infraestrutura corporativa resiliente, governança e migração.',
    category: 'certifications',
    provider: 'Microsoft Azure',
    level: 'Especialista',
    duration: '90 horas de estudo sugeridas (10 a 12 semanas)',
    examCode: 'AZ-305',
    badgeColor: 'sky',
    technologies: ['Azure Landing Zones', 'Azure Kubernetes (AKS)', 'ExpressRoute', 'Azure SQL Managed Instance', 'Azure Policy', 'Synapse Analytics', 'Azure Front Door'],
    description: 'O exame AZ-305 consolida a credencial mais prestigiada de arquitetura do ecossistema Microsoft. Foca em decisões de alto impacto sobre governança multi-assinatura, topologias de rede Hub-and-Spoke, estratégias de Disaster Recovery e migração de datacenters on-premises.',
    targetAudience: 'Arquitetos de software, tech leads e consultores sênior que desenham sistemas de missão crítica em ambientes corporativos.',
    prerequisites: [
      'Certificação prévia AZ-104 (Azure Administrator) ou AZ-204 (Azure Developer).',
      'Ampla experiência em redes corporativas, virtualização e governança de dados.'
    ],
    skillsLearned: [
      'Desenhar arquiteturas de rede Hub-and-Spoke com Azure Firewall e ExpressRoute.',
      'Projetar governança corporativa com Management Groups, Azure Policy e Cost Management.',
      'Definir soluções de bancos de dados relacionais e não relacionais de alta disponibilidade geográfica.',
      'Projetar continuidade de negócios (BCDR) com RTO/RPO rigorosos via Azure Site Recovery.',
      'Planejar modernização e migração de workloads legados com Azure Migrate.'
    ],
    modules: [
      {
        title: 'Módulo 1: Governança, Identidade e Topologias de Rede',
        hours: '22h',
        topics: [
          'Design de hierarquia de Management Groups, Subscriptions e Azure Policy para conformidade',
          'Topologia Hub-Spoke: Hub centralizado com Azure Firewall, VPN Gateway e ExpressRoute',
          'Aceleração e segurança global com Azure Front Door e Application Gateway WAF v2',
          'Estratégias de identidade híbrida com Microsoft Entra Connect e PIM (Privileged Identity Management)'
        ]
      },
      {
        title: 'Módulo 2: Design de Computação e Orquestração',
        hours: '24h',
        topics: [
          'Dimensionamento de Azure Kubernetes Service (AKS): CNI vs Kubenet, ingress controllers e pools dedicados',
          'HPC e cargas de trabalho especializadas em computação confidencial',
          'Estratégias de automação com Bicep, Terraform e Azure Resource Manager (ARM)'
        ]
      },
      {
        title: 'Módulo 3: Arquitetura de Dados e Analytics',
        hours: '22h',
        topics: [
          'Bancos relacionais: Azure SQL Database (Hyperscale, Elastic Pools) vs Azure SQL Managed Instance',
          'Data Lakes corporativos: Azure Data Lake Storage Gen2 com permissões POSIX',
          'Pipelines analíticos com Azure Data Factory e Azure Synapse Analytics'
        ]
      },
      {
        title: 'Módulo 4: Continuidade de Negócios e Migração',
        hours: '22h',
        topics: [
          'RPO e RTO corporativos: Azure Site Recovery (ASR) e Azure Backup com Geo-Redundancy (GRS)',
          'Estratégias de migração de datacenters: Rehost, Refactor, Rearchitect com Azure Migrate',
          'Resolução de estudos de caso arquiteturais no formato oficial da Microsoft'
        ]
      }
    ],
    examDomains: [
      { domain: 'Design de soluções de identidade, governança e monitoramento', weight: '25-30%', description: 'Entra ID, PIM, Policies, Landing Zones e arquitetura de logs Log Analytics.' },
      { domain: 'Design de soluções de armazenamento de dados', weight: '25-30%', description: 'SQL Hyperscale, Cosmos DB geo-replicado, Data Lake e particionamento.' },
      { domain: 'Design de continuidade de negócios', weight: '10-15%', description: 'Backup, Disaster Recovery, RTO/RPO e zonas de disponibilidade.' },
      { domain: 'Design de infraestrutura e computação', weight: '25-30%', description: 'AKS, App Service Environment, Hub-Spoke e Azure Front Door.' }
    ],
    officialGuideUrl: 'https://learn.microsoft.com/certifications/exams/az-305/',
    relatedPageId: 'cloud'
  },
  {
    id: 'cloud-fundamentals',
    title: 'Fundamentos de Nuvem Dupla: AWS Cloud Practitioner (CLF-C02) & Azure Fundamentals (AZ-900)',
    subtitle: 'A porta de entrada ideal para entender os modelos IaaS, PaaS, SaaS, precificação e serviços fundamentais nas duas maiores nuvens do mundo.',
    category: 'certifications',
    provider: 'Full-Stack',
    level: 'Iniciante',
    duration: '40 horas de estudo sugeridas (4 semanas)',
    examCode: 'CLF-C02 / AZ-900',
    badgeColor: 'emerald',
    technologies: ['Conceitos Cloud', 'IaaS / PaaS / Serverless', 'Modelos de Custo (TCO)', 'Regiões e Zonas', 'Segurança Compartilhada', 'SLA e Confiabilidade'],
    description: 'Esta trilha unificada ensina os conceitos essenciais de computação em nuvem comparando os termos e serviços correspondentes entre AWS e Azure lado a lado (ex: EC2 vs Azure VM, S3 vs Blob Storage, IAM vs Entra ID), preparando o aluno para aprovação em ambos os exames de fundamentos.',
    targetAudience: 'Iniciantes em tecnologia, desenvolvedores juniores, gestores de TI, analistas de negócios e gerentes de produto.',
    prerequisites: [
      'Conhecimento básico de informática e uso de computadores na web.',
      'Nenhum conhecimento prévio de programação é obrigatório.'
    ],
    skillsLearned: [
      'Diferenciar claramente os modelos de serviço de nuvem (IaaS, PaaS, SaaS, FaaS).',
      'Compreender o Modelo de Responsabilidade Compartilhada entre cliente e provedor.',
      'Calcular e planejar custos com calculadoras de TCO da AWS e do Azure.',
      'Conhecer o mapa de equivalência dos 20 serviços mais importantes da AWS e Azure.',
      'Entender o impacto de Regiões, Zonas de Disponibilidade e Acordos de Nível de Serviço (SLA).'
    ],
    modules: [
      {
        title: 'Módulo 1: Conceitos Universais de Nuvem',
        hours: '10h',
        topics: [
          'O que é Cloud Computing: Elasticidade, Escalabilidade Vertical vs Horizontal e Agilidade',
          'CapEx vs OpEx: Por que empresas migram para o modelo de pagamento sob demanda',
          'Modelos de Nuvem: Pública, Privada e Híbrida'
        ]
      },
      {
        title: 'Módulo 2: Infraestrutura Global e Serviços de Computação',
        hours: '10h',
        topics: [
          'Infraestrutura Global: Regiões, Zonas de Disponibilidade (AZs) e Edge Locations',
          'Computação: AWS EC2 vs Azure Virtual Machines; AWS Lambda vs Azure Functions',
          'Containers básicos: Conceito de Docker e orquestração'
        ]
      },
      {
        title: 'Módulo 3: Armazenamento, Bancos de Dados e Redes',
        hours: '10h',
        topics: [
          'Armazenamento: Amazon S3 vs Azure Blob Storage',
          'Bancos de Dados: Amazon RDS/DynamoDB vs Azure SQL/Cosmos DB',
          'Rede Básica: VPC e Subnets vs VNet e Sub-redes'
        ]
      },
      {
        title: 'Módulo 4: Segurança, Conformidade e Simulados',
        hours: '10h',
        topics: [
          'Modelo de Responsabilidade Compartilhada detalhado',
          'Governança: AWS Organizations e Well-Architected Framework vs Azure Policy e CAF',
          'Simulados de 50 questões estilo CLF-C02 e AZ-900 com comentários'
        ]
      }
    ],
    officialGuideUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    relatedPageId: 'cloud'
  },
  {
    id: 'dotnet-microservices',
    title: 'Formação Arquiteto .NET 8 & Microsserviços Corporativos',
    subtitle: 'Domine C# 12, Minimal APIs de alta concorrência, EF Core 8, Docker, RabbitMQ e observabilidade OpenTelemetry.',
    category: 'backend',
    provider: 'Full-Stack',
    level: 'Avançado',
    duration: '85 horas de conteúdo e projetos práticos',
    badgeColor: 'violet',
    technologies: ['C# 12', '.NET 8', 'Minimal APIs', 'Entity Framework Core 8', 'Docker', 'PostgreSQL', 'Redis', 'RabbitMQ', 'OpenTelemetry'],
    description: 'Trilha profunda voltada para engenheiros que desenvolvem serviços de missão crítica com C# e o runtime .NET 8. Aborda desde a eliminação de reflexão com Native AOT e Minimal APIs até arquiteturas distribuídas com mensageria e resiliência com Polly.',
    targetAudience: 'Desenvolvedores .NET que querem evoluir de monólitos MVC tradicionais para microsserviços modernos, leves e de altíssima performance.',
    prerequisites: [
      'Conhecimento intermediário de C# e orientação a objetos.',
      'Experiência prévia consumindo e criando APIs REST básicas.'
    ],
    skillsLearned: [
      'Construir APIs de altíssimo throughput com .NET 8 Minimal APIs alcançando mais de 45.000 req/s.',
      'Implementar Clean Architecture com injeção de dependência e desacoplamento do EF Core.',
      'Otimizar consultas no Entity Framework Core com AsNoTracking, Split Queries e Compiled Queries.',
      'Orquestrar mensageria assíncrona tolerante a falhas com RabbitMQ e MassTransit.',
      'Instrumentar traces e métricas com OpenTelemetry, Prometheus e Grafana.'
    ],
    modules: [
      {
        title: 'Módulo 1: .NET 8 Core & Minimal APIs de Alta Performance',
        hours: '20h',
        topics: [
          'Novidades do C# 12: Primary constructors, collection expressions e performance de tipos',
          'Minimal APIs em profundidade: TypedResults, Endpoint Filters e validação com FluentValidation',
          'Compilação Native AOT: Otimizações de tempo de inicialização e footprint de memória'
        ]
      },
      {
        title: 'Módulo 2: Persistência com EF Core 8 e PostgreSQL',
        hours: '20h',
        topics: [
          'Modelagem de Domínio com EF Core 8: Value Objects, Owned Types e Migrations seguras',
          'Otimização extrema de SQL gerado: Análise com EXPLAIN ANALYZE no PostgreSQL',
          'Resiliência de conexão e suporte a transações distribuídas (Outbox Pattern)'
        ]
      },
      {
        title: 'Módulo 3: Comunicação Assíncrona & Mensageria',
        hours: '25h',
        topics: [
          'Padrão Publish/Subscribe com RabbitMQ e biblioteca MassTransit',
          'Tratamento de falhas: Retry policies com Polly, Circuit Breaker e Dead-Letter Queues',
          'Idempotência no processamento de eventos para evitar duplicações de pagamento'
        ]
      },
      {
        title: 'Módulo 4: Observabilidade e Deploy em Containers',
        hours: '20h',
        topics: [
          'Dockerfiles multi-stage otimizados com imagens base Chiseled Ubuntu (.NET 8)',
          'Observabilidade moderna: Distributed Tracing com OpenTelemetry e Jaeger',
          'Health Checks estruturados para orquestração em Kubernetes'
        ]
      }
    ],
    relatedArticleId: 'dotnet-minimal-apis',
    relatedPageId: 'backend',
    relatedTab: 'dotnet'
  },
  {
    id: 'python-fastapi',
    title: 'Formação Engenharia de APIs com Python & FastAPI Moderno',
    subtitle: 'Construa serviços corporativos assíncronos com Python 3.12, Clean Architecture, Pydantic v2 e SQLAlchemy 2.',
    category: 'backend',
    provider: 'Full-Stack',
    level: 'Intermediário',
    duration: '70 horas de estudo e projetos',
    badgeColor: 'amber',
    technologies: ['Python 3.12', 'FastAPI', 'AsyncIO', 'Pydantic v2', 'SQLAlchemy 2', 'Alembic', 'Pytest', 'Docker', 'JWT / OAuth2'],
    description: 'Aprenda a elevar o desenvolvimento Python corporativo para além de scripts isolados: arquitetura desacoplada, validação ultra rápida com Pydantic em Rust (v2), pooling assíncrono de banco de dados e testes unitários com mocks em memória.',
    targetAudience: 'Desenvolvedores Python, cientistas de dados e engenheiros de backend que buscam construir APIs robustas para produção.',
    prerequisites: [
      'Conhecimento intermediário da linguagem Python (funções, decorators, classes).',
      'Noções de requisições HTTP e banco de dados relacional.'
    ],
    skillsLearned: [
      'Dominar o paradigma assíncrono (async / await) no Python com Uvicorn e uvloop.',
      'Validar e serializar dados com máxima velocidade utilizando Pydantic v2.',
      'Desacoplar o domínio da aplicação com Clean Architecture e Injeção de Dependências (`Depends`).',
      'Gerenciar transações assíncronas com SQLAlchemy 2 e migrations com Alembic.',
      'Garantir mais de 90% de cobertura de código com Pytest, Fixtures e TestClient.'
    ],
    modules: [
      {
        title: 'Módulo 1: Fundamentos Modernos do FastAPI & AsyncIO',
        hours: '16h',
        topics: [
          'Como funciona o Event Loop no Python 3.12: Concorrência I/O-bound vs Multiprocessing CPU-bound',
          'Roteamento estruturado com APIRouter e padronização de OpenAPI/Swagger interativo',
          'Tratamento centralizado de exceções com Exception Handlers customizados'
        ]
      },
      {
        title: 'Módulo 2: Validação & Tipagem Forte com Pydantic v2',
        hours: '18h',
        topics: [
          'Pydantic Core escrito em Rust: Ganhos de performance em validação de payloads',
          'Field validators, model validators e serialização condicional',
          'Configurações de ambiente tipadas com pydantic-settings'
        ]
      },
      {
        title: 'Módulo 3: Arquitetura Limpa e Banco de Dados com SQLAlchemy 2',
        hours: '20h',
        topics: [
          'Separação em camadas: Entidades de Domínio, Repositórios e Casos de Uso',
          'Mapeamento Declarativo com SQLAlchemy 2 em modo 100% assíncrono (asyncpg)',
          'Evolução segura de schemas com migrações automatizadas via Alembic'
        ]
      },
      {
        title: 'Módulo 4: Autenticação, Testes e Produção',
        hours: '16h',
        topics: [
          'Segurança: Autenticação JWT com OAuth2PasswordBearer, hash Bcrypt e RBAC',
          'Bateria de testes com Pytest, Fixtures de banco isoladas com SQLite em memória',
          'Deploy em containers Docker com multi-worker Gunicorn + Uvicorn'
        ]
      }
    ],
    relatedArticleId: 'fastapi-clean-architecture',
    relatedPageId: 'backend',
    relatedTab: 'python'
  },
  {
    id: 'angular-signals',
    title: 'Formação Frontend Moderno com Angular 17/18 & Signals',
    subtitle: 'Aprenda a construir SPAs corporativas sem overhead de Zone.js, com reatividade granular cirúrgica e Standalone Components.',
    category: 'frontend',
    provider: 'Full-Stack',
    level: 'Avançado',
    duration: '65 horas de imersão técnica',
    badgeColor: 'rose',
    technologies: ['Angular 18', 'Signals', 'Computed', 'Effects', 'Standalone Components', 'TypeScript 5', 'RxJS Interop', 'Deferrable Views', 'SSR / Hydration'],
    description: 'O Angular passou pela maior revolução da sua história a partir das versões 17 e 18. Esta formação ensina a construir aplicações corporativas rápidas eliminando o gargalo tradicional do Zone.js e da detecção de mudanças suja, aproveitando o modelo de Signals nativos com grafos de dependência reativos.',
    targetAudience: 'Desenvolvedores front-end que precisam desenvolver sistemas densos, painéis financeiros e portais corporativos escaláveis.',
    prerequisites: [
      'Conhecimento sólido de JavaScript moderno (ES6+) e TypeScript.',
      'Experiência prévia com desenvolvimento de componentes web.'
    ],
    skillsLearned: [
      'Dominar os primitivos `signal()`, `computed()` e `effect()` do Angular moderno.',
      'Migrar projetos legados com Zone.js para a nova arquitetura Zoneless e Signals-based.',
      'Usar a nova sintaxe de controle de fluxo de template (@if, @for, @switch, @defer).',
      'Integrar de forma idiomática Streams do RxJS com Signals através de `toSignal()` e `toObservable()`.',
      'Configurar Server-Side Rendering (SSR) e hidratação não destrutiva no Angular 18.'
    ],
    modules: [
      {
        title: 'Módulo 1: O Fim do Virtual DOM e o Renascimento dos Signals',
        hours: '15h',
        topics: [
          'Por que Signals operam cirurgicamente no nó de DOM sem re-renderizar a árvore',
          'Writable signals, computed signals memoizados e side-effects seguros',
          'Sintaxe nativa de templates: @if, @for com tracking obrigatório e @defer com viewport triggers'
        ]
      },
      {
        title: 'Módulo 2: Standalone Components & Nova Injeção de Dependências',
        hours: '15h',
        topics: [
          'Arquitetura 100% livre de NgModules: Standalone components, pipes e directives',
          'Função `inject()` em substituição a construtores com boilerplate',
          'Gerenciamento de estado de tela com Signal Stores'
        ]
      },
      {
        title: 'Módulo 3: Interoperabilidade Signals + RxJS',
        hours: '18h',
        topics: [
          'Quando usar Signals (estado síncrono da UI) vs quando usar RxJS (eventos assíncronos e debounce)',
          'Padrões avançados com `toSignal` e `toObservable`',
          'Cancelamento de requisições HTTP e tratamento de retry declarativo'
        ]
      },
      {
        title: 'Módulo 4: Arquitetura Corporativa, SSR e Performance',
        hours: '17h',
        topics: [
          'Otimização de bundles com deferrable views (@defer)',
          'Hydration não destrutiva e SSR no Angular 18',
          'Testes unitários de componentes reativos com Jasmine/Karma ou Vitest'
        ]
      }
    ],
    relatedArticleId: 'signals-reactivity',
    relatedPageId: 'frontend',
    relatedTab: 'angular'
  },
  {
    id: 'react-nextjs',
    title: 'Formação Arquiteto React 19 & Next.js 14 / App Router',
    subtitle: 'Domine React Server Components, Server Actions, React Compiler, TanStack Query e otimizações Core Web Vitals.',
    category: 'frontend',
    provider: 'Full-Stack',
    level: 'Avançado',
    duration: '75 horas de imersão técnica',
    badgeColor: 'sky',
    technologies: ['React 19', 'Next.js 14', 'Server Components (RSC)', 'Server Actions', 'React Compiler', 'TanStack Query v5', 'Zustand', 'Tailwind CSS'],
    description: 'Projete aplicações web modernas combinando a flexibilidade do ecossistema React 19 com a robustez do Next.js 14. Aprenda quando usar Server Components para eliminar código JavaScript enviado ao cliente e como gerenciar estado assíncrono sem prop drilling.',
    targetAudience: 'Desenvolvedores React que desejam dominar o novo paradigma full-stack orientado a servidores e otimizar métricas Core Web Vitals.',
    prerequisites: [
      'Conhecimento intermediário de React (hooks useState, useEffect, contexto).',
      'Boa compreensão de TypeScript e manipulação de APIs REST.'
    ],
    skillsLearned: [
      'Entender a divisão arquitetural entre React Server Components e Client Components.',
      'Executar mutações de banco de dados diretamente via Server Actions com validação de formulários.',
      'Aproveitar o novo React Compiler para eliminar a necessidade de useMemo e useCallback manuais.',
      'Implementar cache de dados assíncronos com TanStack Query v5 (deduplicação, refetch automático).',
      'Otimizar as métricas de Core Web Vitals (LCP, INP, CLS) para máxima pontuação no Google.'
    ],
    modules: [
      {
        title: 'Módulo 1: O Novo Modelo Mental do React 19',
        hours: '18h',
        topics: [
          'Adeus memoização manual: Como o React Compiler detecta mutações automaticamente',
          'Novos hooks do React 19: `use()`, `useActionState()`, `useOptimistic()` e `useFormStatus()`',
          'Asset loading automático e suporte nativo a tags de cabeçalho (SEO)'
        ]
      },
      {
        title: 'Módulo 2: Next.js 14 & App Router em Escala',
        hours: '20h',
        topics: [
          'App Router vs Pages Router: Hierarquia de pastas, layouts compartilhados e templates',
          'Server Components em profundidade: Redução de pacotes JS para o navegador a zero',
          'Server Actions com validação Zod e revalidação de caminhos com `revalidatePath`'
        ]
      },
      {
        title: 'Módulo 3: Cache, Estado Assíncrono e Global',
        hours: '18h',
        topics: [
          'TanStack Query v5 no lado do cliente: Cache-aside, queries paralelas e optimistic updates',
          'Estado global ultra leve com Zustand vs Context API',
          'As 4 camadas de cache do Next.js (Request Memoization, Data Cache, Full Route Cache, Router Cache)'
        ]
      },
      {
        title: 'Módulo 4: Web Vitals, Edge Rendering e Deploy',
        hours: '19h',
        topics: [
          'Streaming SSR com Suspense boundaries para evitar travamentos de tela',
          'Auditoria de Core Web Vitals: Diagnosticando gargalos de LCP e INP',
          'Deploy otimizado na Vercel ou em containers Docker corporativos'
        ]
      }
    ],
    relatedArticleId: 'ssr-edge-rendering',
    relatedPageId: 'frontend',
    relatedTab: 'react'
  },
  {
    id: 'terraform-devops',
    title: 'Formação Infraestrutura como Código com Terraform & DevOps',
    subtitle: 'Automatize provisão de nuvem multi-cloud com Terraform (preparatório Associate), Docker, Kubernetes e GitHub Actions.',
    category: 'cloud',
    provider: 'HashiCorp',
    level: 'Intermediário',
    duration: '60 horas de conteúdo prático',
    examCode: 'HashiCorp Terraform Associate (003)',
    badgeColor: 'purple',
    technologies: ['Terraform', 'HCL', 'AWS / Azure Providers', 'Docker', 'Kubernetes', 'GitHub Actions', 'Trivy', 'GitOps'],
    description: 'Transforme infraestrutura manual em código versionado, testável e auditável. Esta trilha cobre desde a sintaxe da linguagem HCL e gerenciamento de estado remoto (.tfstate com locking) até a integração de pipelines CI/CD com GitHub Actions para automação de deploys.',
    targetAudience: 'Desenvolvedores backend, arquitetos e engenheiros de DevOps que desejam eliminar tarefas manuais de provisão de nuvem.',
    prerequisites: [
      'Noções básicas de Git e linha de comando Linux.',
      'Conhecimento básico sobre recursos de nuvem (máquinas virtuais, redes, buckets de armazenamento).'
    ],
    skillsLearned: [
      'Escrever código declarativo limpo e reutilizável em HashiCorp Configuration Language (HCL).',
      'Gerenciar ciclos de vida de estado remoto (Terraform State) com S3 backend e DynamoDB locking.',
      'Criar módulos customizados com validação estrita de variáveis e outputs.',
      'Construir pipelines automatizados com GitHub Actions para execução de `terraform plan` e `apply`.',
      'Escanear vulnerabilidades de segurança de infraestrutura com ferramentas estáticas (Tfsec e Trivy).'
    ],
    modules: [
      {
        title: 'Módulo 1: Fundamentos do Terraform & Sintaxe HCL',
        hours: '14h',
        topics: [
          'O ciclo de vida do Terraform: `init`, `validate`, `plan`, `apply` e `destroy`',
          'Sintaxe HCL: Recursos, Fontes de Dados (Data Sources), Variáveis e Outputs',
          'Funções embutidas, condicionais e laços com `for_each` e `count`'
        ]
      },
      {
        title: 'Módulo 2: Gerenciamento Seguro de Estado (State Management)',
        hours: '16h',
        topics: [
          'O que é o `terraform.tfstate` e por que ele nunca deve ser commitado no Git',
          'Configuração de Remote Backend seguro com criptografia e trava de concorrência',
          'Comandos de emergência: `state mv`, `state rm`, `import` de recursos existentes e tainted resources'
        ]
      },
      {
        title: 'Módulo 3: Módulos Reutilizáveis e Boas Práticas',
        hours: '15h',
        topics: [
          'Design de módulos reutilizáveis (VPC, Cluster EKS/AKS, Banco de Dados)',
          'Versionamento de módulos e consumo via Terraform Registry público e privado',
          'Validação personalizada de variáveis (custom validation rules) e documentação automática'
        ]
      },
      {
        title: 'Módulo 4: Pipelines CI/CD com GitHub Actions & Simulados',
        hours: '15h',
        topics: [
          'Pipeline automatizado: Lint, verificação de formatação e plan com comentários no Pull Request',
          'Autenticação sem credenciais de longa duração com OIDC (OpenID Connect) na AWS/Azure',
          'Simulados direcionados para o exame HashiCorp Certified: Terraform Associate (003)'
        ]
      }
    ],
    officialGuideUrl: 'https://www.hashicorp.com/certification/terraform-associate',
    relatedPageId: 'cloud'
  },
  {
    id: 'data-cache-arch',
    title: 'Formação Engenharia de Dados & Cache: PostgreSQL Avançado + Redis',
    subtitle: 'Domine modelagem relacional estrita, indexação avançada GiN/B-Tree, JSONB em alta escala e caching defensivo.',
    category: 'architecture',
    provider: 'Full-Stack',
    level: 'Avançado',
    duration: '60 horas de imersão técnica',
    badgeColor: 'emerald',
    technologies: ['PostgreSQL 16', 'Redis 7', 'EXPLAIN ANALYZE', 'Índices GiN / BRIN', 'Particionamento', 'Redlock', 'Cache-Aside', 'Connection Pooling (PgBouncer)'],
    description: 'Bancos de dados e camadas de cache são os componentes mais críticos para a estabilidade e o custo operacional de qualquer arquitetura corporativa. Esta formação ensina a diagnosticar gargalos de CPU e I/O no PostgreSQL, projetar índices cirúrgicos e implementar estratégias resilientes de cache com Redis que protegem a base contra colapsos de concorrência.',
    targetAudience: 'Engenheiros de backend, DBAs e arquitetos de software responsáveis pela performance e escalabilidade de dados.',
    prerequisites: [
      'Conhecimento intermediário de SQL relacional (SELECT, JOINs, GROUP BY, transações).',
      'Experiência prévia conectando aplicações a bancos de dados.'
    ],
    skillsLearned: [
      'Interpretar planos de execução complexos com `EXPLAIN (ANALYZE, BUFFERS)` para eliminar Seq Scans indesejados.',
      'Modelar e indexar documentos semiestruturados JSONB com índices GiN de alto desempenho.',
      'Projetar particionamento de tabelas por intervalo (Range Partitioning) para bilhões de registros.',
      'Prevenir eventos de Cache Stampede (Thundering Herd) usando jitter randômico em TTL e mutex distribuído.',
      'Configurar pooling de conexões eficiente com PgBouncer para mitigar o custo de processos de backend.'
    ],
    modules: [
      {
        title: 'Módulo 1: Otimização Extrema de Consultas no PostgreSQL',
        hours: '16h',
        topics: [
          'Anatomia interna do PostgreSQL: Shared Buffers, WAL (Write-Ahead Logging) e MVCC',
          'Decifrando o EXPLAIN ANALYZE: Cost, Rows, Loops, Buffer Hits e Disk Reads',
          'Estratégias de Indexação: B-Tree, Índices Parciais, Índices Cobertos (Covering/INCLUDE) e BRIN para logs temporais'
        ]
      },
      {
        title: 'Módulo 2: Modelagem Híbrida Relacional + JSONB & Particionamento',
        hours: '15h',
        topics: [
          'JSONB em profundidade: Operadores `@>`, `jsonb_path_query` e indexação GiN (jsonb_path_ops)',
          'Particionamento de Tabelas Declarativo: Range vs List vs Hash com retenção automática de dados',
          'Vacuuming e Autovacuum tuning para prevenir inchaço de tabela (table bloat) e Transaction Wraparound'
        ]
      },
      {
        title: 'Módulo 3: Arquitetura Defensiva com Redis em Alta Concorrência',
        hours: '15h',
        topics: [
          'Padrões de Caching: Cache-Aside vs Write-Through vs Write-Behind',
          'Mitigação de Thundering Herd: Algoritmo de Mutex com SETNX / Redlock e Early Expiration probabilístico',
          'Políticas de Evicção sob saturação de memória: allkeys-lru vs volatile-lru e compactação de memória'
        ]
      },
      {
        title: 'Módulo 4: Alta Disponibilidade, Pooling e Resiliência',
        hours: '14h',
        topics: [
          'Gerenciamento de conexões em escala com PgBouncer (Transaction Pooling mode)',
          'Replicação Física de streaming com failover automático (Patroni ou serviços gerenciados de nuvem)',
          'Auditoria de segurança, mascaramento de dados (LGPD) e rotinas de backup com pg_dump e WAL-G'
        ]
      }
    ],
    relatedArticleId: 'redis-caching-patterns',
    relatedPageId: 'database',
    relatedTab: 'relational'
  }
];
