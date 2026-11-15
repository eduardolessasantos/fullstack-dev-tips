import { BusinessLocale } from '../../types.ts';

const businessPt: BusinessLocale = {
  ui: {
    badge: 'PLANEJAMENTO ESTRATÉGICO DE TI & ORÇAMENTAÇÃO',
    title: 'Diagnóstico de Digitalização & Orçamento Empresarial',
    subtitle:
      'Simule os custos reais de desenvolvimento, infraestrutura em nuvem, prazos em semanas e a arquitetura ideal de software adaptada com precisão ao nicho comercial da sua empresa.',
    steps: [
      { step: 1, title: '1. Setor & Nicho', desc: 'Segmento da economia' },
      { step: 2, title: '2. Porte da Empresa', desc: 'Volume e colaboradores' },
      { step: 3, title: '3. Maturidade Digital', desc: 'Sistemas atuais' },
      { step: 4, title: '4. Objetivo Principal', desc: 'Meta do projeto' }
    ],
    stepCounterPrefix: 'Etapa',
    stepCounterOf: 'de',
    step1Title: 'Selecione o Setor da Economia',
    step2Title: 'Qual o Porte da Organização?',
    sectorTitle: 'Selecione o Setor da Economia',
    sectorSubtitle: 'Cada setor possui padrões arquiteturais e exigências regulatórias únicas.',
    suggestedStackPrefix: 'Stack sugerida:',
    nichePrompt: 'Qual o nicho específico ou especialidade da empresa?',
    nicheLabel: 'Nicho específico ou especialidade',
    nichePlaceholder:
      'Ou digite o nicho exato (ex: Distribuidora de Medicamentos Especiais, E-commerce de Peças Náuticas...)',
    sizeTitle: 'Qual o Porte da Organização?',
    sizeSubtitle: 'O tamanho da equipe e volume transacional calibram os custos de licença, governança e cloud.',
    sizeLabel: 'Porte da organização',
    typicalSquadPrefix: 'Squad típica:',
    maturityTitle: 'Maturidade Digital Atual da Empresa',
    maturitySubtitle:
      'Impacta diretamente a complexidade de saneamento de dados e curva de migração da equipe.',
    maturityLabel: 'Maturidade digital atual',
    migrationFactorLabel: 'Fator de complexidade na migração:',
    goalTitle: 'Qual a Principal Meta do Projeto?',
    goalSubtitle: 'Define o escopo central da primeira entrega (MVP) e a arquitetura primária.',
    goalLabel: 'Meta principal do projeto',
    baseTimelineLabel: 'Prazo base estimado:',
    customReqLabel: 'Observações ou Requisitos Específicos do seu Negócio (Opcional)',
    customReqPlaceholder:
      "Ex: 'Precisamos integrar com o ERP Totvs Protheus existente e operar offline no depósito'...",
    prevStepBtn: '← Voltar Etapa',
    nextStepBtn: 'Próxima Etapa',
    generateBtn: 'Gerar Relatório',
    projectionTitle: 'Projeção Orçamentária & Técnica',
    estimatedForPrefix: 'Cálculo estimado para:',
    previewBtnTitle: 'Baixar resumo executivo preliminar em PDF',
    completeBtnTitle: 'Acessar dossiê analítico completo com 6 páginas',
    previewSuccessNotice: 'PDF Preview gerado com sucesso! Verifique seus downloads.',
    completeSuccessNotice:
      'Dossiê Analítico Completo (6 páginas) gerado com sucesso! Seus dados foram recebidos pela nossa equipe.',
    downloadPreviewPdf: 'Baixar Preview Gratuito (.pdf)',
    downloadFullPdf: 'Obter Dossiê Analítico Completo (6 Páginas)',
    resetBtn: 'Reiniciar',
    kpiCapex: 'Investimento (Capex)',
    kpiOpex: 'Custo Nuvem (Opex)',
    kpiTimeline: 'Tempo de Rollout',
    kpiSprints: 'Tamanho do Squad',
    perMonth: '/mês',
    weeks: 'semanas',
    sprintsOf2Weeks: 'sprints quinzenais ágeis',
    professionalsUnit: 'profissionais',
    squadSummaryNote: 'Tech Lead, Desenvolvedores Sêniores, DevOps e Analista QA.',
    archBadgeNote: 'Integração nativa com guias técnicos do CodeCompare',
    archPatternLabel: 'Padrão Arquitetural:',
    challengesTitle: 'Desafios Operacionais Mapeados',
    archTitle: 'Arquitetura Recomendada para',
    cloudSimTitle: 'Simulação de Nuvem',
    tierLabel: 'Plano:',
    monthlyInfraEst: 'Estimativa mensal de infra:',
    breakdownTitle: 'Detalhamento do Investimento',
    squadTitle: 'Composição Recomendada do Squad',
    rolloutTitle: 'Cronograma de Implementação Faseada',
    risksTitle: 'Matriz de Riscos Estratégicos',
    impactLabel: 'Impacto',
    mitigationLabel: 'Mitigação:',
    complianceTitle: 'Conformidade & Segurança',
    lgpdSectorTitle: 'Diretrizes LGPD do Setor',
    modalBadge: 'DOSSIÊ COMPLETO // 6 PÁGINAS',
    modalTitle: 'Onde devemos enviar seu Relatório Analítico?',
    modalSubtitle:
      'O PDF completo será baixado imediatamente no seu dispositivo com o nome da sua empresa personalizado.',
    modalNameLabel: 'Seu Nome Completo *',
    modalNamePlaceholder: 'Ex: Carlos Eduardo',
    modalEmailLabel: 'E-mail Profissional *',
    modalEmailPlaceholder: 'carlos@empresa.com.br',
    modalPhoneLabel: 'WhatsApp / Telefone',
    modalPhonePlaceholder: '(11) 99999-9999',
    modalCompanyLabel: 'Nome da Empresa',
    modalCompanyPlaceholder: 'Ex: Indústrias Brasil S/A',
    modalConsultCheck:
      'Desejo receber contato técnico de um especialista para orçamento de squad ou consultoria.',
    modalSubmitBtn: 'Gerar & Baixar Dossiê Completo (.pdf)',
    modalSubmittingBtn: 'Registrando e Gerando Relatório...',
    modalCancelBtn: 'Cancelar',
    modalPrivacyNote: 'Seus dados estão protegidos em conformidade com a LGPD (Lei 13.709/2018).',
    formspreeLeadType: 'Lead B2B - Diagnóstico Business',
    formspreeNotProvided: 'Não informado',
    formspreeConsultYes: 'Sim, solicitar contato técnico',
    formspreeConsultNo: 'Apenas relatório',
    formspreeNoCustomReq: 'Nenhum informado',
    rangeJoin: 'a',
    impactMap: {
      Alto: 'Alto',
      Médio: 'Médio',
      Baixo: 'Baixo'
    }
  },
  sectors: {
    retail: {
      id: 'retail',
      name: 'Comércio & Varejo / E-commerce',
      tagline: 'Vendas omnicanal, catálogo de produtos, checkout de alta conversão e conciliação de estoques.',
      iconName: 'ShoppingBag',
      badge: 'Alta Concorrência & Picos de Acesso',
      typicalNiches: [
        'E-commerce D2C & B2B',
        'Supermercados e Distribuidoras',
        'Lojas de Moda e Vestuário',
        'Farmácias e Cosméticos',
        'Materiais de Construção & Autopeças'
      ],
      primaryChallenges: [
        'Gestão de estoque em tempo real entre loja física e online',
        'Gargalos no checkout durante campanhas promocionais (Black Friday)',
        'Integração complexa com gateways de pagamento, antifraude e transportadoras',
        'Recuperação de carrinhos abandonados e personalização de ofertas'
      ],
      recommendedFrontend: 'React / Next.js com Tailwind CSS (SSR/SSG para SEO rápido)',
      recommendedBackend: 'Go (Fiber) ou Node.js para microserviços de alta taxa de requisições',
      recommendedDatabase: 'PostgreSQL (transacional) + Redis (cache de catálogo e sessão)',
      recommendedCloud: 'AWS (CloudFront CDN, ECS Fargate, S3 e Aurora Serverless)',
      architectureHighlight:
        'Arquitetura desacoplada Headless Commerce com Cache-Aside e mensageria assíncrona para emissão fiscal.',
      lgpdConsiderations: [
        'Criptografia ponta a ponta dos dados de cartão (conformidade PCI-DSS)',
        'Consentimento explícito para cookies de remarketing e rastreamento',
        'Anonimização de histórico de compras após expiração de obrigações fiscais'
      ]
    },
    industry: {
      id: 'industry',
      name: 'Indústria & Manufatura',
      tagline: 'Chão de fábrica, automação industrial, controle de OEE, telemetria de maquinário e PCP.',
      iconName: 'Factory',
      badge: 'Chão de Fábrica & Resiliência Operacional',
      typicalNiches: [
        'Metalmecânica e Usinagem',
        'Alimentos e Bebidas',
        'Têxtil e Confecção Industrial',
        'Química e Plásticos',
        'Mobiliária e Esquadrias'
      ],
      primaryChallenges: [
        'Falta de visibilidade em tempo real do OEE (Overall Equipment Effectiveness)',
        'Apontamento manual de produção gerando perdas e atrasos no PCP',
        'Ambientes industriais com conectividade intermitente (necessidade de operação offline-first)',
        'Manutenção preventiva inexistente gerando paradas não programadas'
      ],
      recommendedFrontend: 'Vue 3 com Composition API (ótimo para telas de terminais e IHM ágeis)',
      recommendedBackend: '.NET 8 (C#) ou Java Spring Boot para processamento robusto e conexão com PLC/SCADA',
      recommendedDatabase: 'PostgreSQL + TimescaleDB (para métricas de telemetria IoT e sensores)',
      recommendedCloud: 'Microsoft Azure (Azure IoT Hub, Edge Computing e App Services)',
      architectureHighlight:
        'Arquitetura Edge-to-Cloud com processamento local em gateways industriais e sincronização periódica na nuvem.',
      lgpdConsiderations: [
        'Proteção de segredos industriais e propriedade intelectual de fórmulas/projetos',
        'Controle de acesso biométrico/crachá em conformidade com dados sensíveis',
        'Auditoria de registros de qualidade e rastreabilidade de lotes'
      ]
    },
    services: {
      id: 'services',
      name: 'Prestação de Serviços & B2B',
      tagline: 'Ordem de serviço digital, agendamentos, precificação dinâmica, faturamento recorrente e contratos.',
      iconName: 'Briefcase',
      badge: 'Eficiência de Horas & Retenção de Clientes',
      typicalNiches: [
        'Consultorias Jurídicas, Contábeis e Financeiras',
        'Empresas de Manutenção, Climatização e Facilities',
        'Agências de Marketing, Design e Software',
        'Empresas de Segurança e Terceirização',
        'Educação Corporativa e Treinamentos'
      ],
      primaryChallenges: [
        'Falta de padronização nas ordens de serviço e comprovação digital de entregas',
        'Dificuldade em mensurar a rentabilidade real por cliente e por hora trabalhada',
        'Retrabalho na geração de contratos e cobranças recorrentes (inadimplência)',
        'Comunicação fragmentada entre equipe externa de campo e escritório'
      ],
      recommendedFrontend: 'React com Vite e Lucide Icons (dashboard administrativo veloz e intuitivo)',
      recommendedBackend: 'Python (FastAPI) ou .NET 8 com geração automatizada de relatórios em PDF',
      recommendedDatabase: 'PostgreSQL (relacional estruturado com JSONB para campos flexíveis)',
      recommendedCloud: 'Google Cloud Platform (Cloud Run, Cloud SQL e Firebase Cloud Messaging)',
      architectureHighlight:
        'Sistema multi-tenant com workflows configuráveis, assinatura digital integrada e aplicativo PWA para equipes de campo.',
      lgpdConsiderations: [
        'Sigilo estrito de dados financeiros e contratuais de clientes corporativos',
        'Gestão de prazos de retenção de contratos com expiração automática',
        'Mecanismo de exportação de dados para cumprimento do Artigo 18 da LGPD'
      ]
    },
    health: {
      id: 'health',
      name: 'Saúde, Clínicas & Laboratórios',
      tagline: 'Prontuário Eletrônico (PEP), telemedicina, agendamento integrado e faturamento TISS/TUSS.',
      iconName: 'Activity',
      badge: 'Máximo Rigor Regulatório & Dados Sensíveis',
      typicalNiches: [
        'Clínicas Médicas e Odontológicas Multiespecialidades',
        'Laboratórios de Análises Clínicas e Imagem',
        'Hospitais de Pequeno e Médio Porte',
        'Centros de Fisioterapia e Reabilitação',
        'Clínicas Veterinárias e Hospitais Pet'
      ],
      primaryChallenges: [
        'Vazamento acidental de dados de prontuário e histórico médico de pacientes',
        'Glosa de faturamento médico por incompatibilidade com padrões TISS/TUSS de convênios',
        'Altas taxas de no-show (faltas) em consultas agendadas',
        'Lentidão no compartilhamento de laudos e exames de imagem pesados (DICOM)'
      ],
      recommendedFrontend: 'Angular 18 Standalone ou React com tipagem estrita e validação de acessibilidade',
      recommendedBackend: 'Java (Spring Boot 3) ou .NET 8 com barramento enterprise e logging imutável',
      recommendedDatabase: 'PostgreSQL com criptografia de coluna (pgcrypto) e particionamento temporal',
      recommendedCloud: 'AWS Gov/Healthcare ou Google Cloud (Cloud Healthcare API com conformidade HIPAA/LGPD)',
      architectureHighlight:
        'Microsserviços com autenticação mTLS, auditoria imutável (Audit Trail) e barramento seguro de integração TISS.',
      lgpdConsiderations: [
        'Tratamento de dados de saúde como dados pessoais sensíveis (Art. 11 LGPD)',
        'Auditoria estrita de acessos: todo clique em prontuário deve ser registrado e rastreável',
        'Assinatura digital padrão ICP-Brasil para médicos e emissão de receitas controladas'
      ]
    },
    logistics: {
      id: 'logistics',
      name: 'Logística, Transporte & Frotas',
      tagline: 'Roteirização inteligente, tracking de cargas, telemetria de frota, manifesto MDF-e/CT-e e SLA.',
      iconName: 'Truck',
      badge: 'Operação Crítica & Otimização de Rota',
      typicalNiches: [
        'Transportadoras de Carga Fracionada e Lotação',
        'Operadores Logísticos e Armazéns Gerais (WMS)',
        'Frotas Próprias de Distribuição Urbana',
        'Courier e Entregas Expressas (Last Mile)',
        'Transporte de Passageiros e Fretamento'
      ],
      primaryChallenges: [
        'Altos custos de combustível por falta de roteirização automatizada',
        'Atrasos na emissão e validação em lote de CT-e e MDF-e junto à SEFAZ',
        'Incerteza do cliente final sobre o status exato da entrega em trânsito',
        'Manutenção corretiva cara de veículos e desgaste excessivo de pneus'
      ],
      recommendedFrontend: 'React com suporte a mapas interativos (MapLibre/Leaflet) e painéis em tempo real',
      recommendedBackend: 'Go (Golang) com alta concorrência para ingestão de eventos de GPS e Webhooks',
      recommendedDatabase: 'PostgreSQL + PostGIS (consultas geoespaciais) + Redis para localização em tempo real',
      recommendedCloud: 'AWS (Kinesis / SQS para mensagens de telemetria, EC2 e RDS PostGIS)',
      architectureHighlight:
        'Event-Driven Architecture (EDA) orientada a eventos de satélite/rastreador com processamento de filas e roteamento geoespacial.',
      lgpdConsiderations: [
        'Anonimização de localização de motoristas fora do horário de expediente comercial',
        'Proteção contra sequestro digital de dados de cargas de alto valor',
        'Criptografia de dados de pagamento de freteiros autônomos'
      ]
    },
    agro: {
      id: 'agro',
      name: 'Agronegócio & Campo Conectado',
      tagline: 'Gestão de safras, insumos, maquinário agrícola, previsão meteorológica e conformidade ESG.',
      iconName: 'Trees',
      badge: 'Offline-First & Gestão Produtiva',
      typicalNiches: [
        'Produtores de Grãos (Soja, Milho, Trigo)',
        'Pecuária de Corte e Leiteira',
        'Cooperativas Agrícolas e Armazéns de Grãos',
        'Hortifrúti e Culturas Irrigadas',
        'Revendas de Insumos e Maquinário Agrícola'
      ],
      primaryChallenges: [
        'Ausência total de internet estável no talhão e sede de fazendas',
        'Desperdício de defensivos e fertilizantes por falta de aplicação em taxa variável',
        'Dificuldade no controle de custos por hectare e fechamento do ciclo produtivo',
        'Exigências rigorosas de compradores internacionais sobre rastreabilidade ESG'
      ],
      recommendedFrontend: 'React com PWA completo e Service Workers para persistência offline via IndexedDB',
      recommendedBackend: 'Python FastAPI (processamento de imagens de satélite/NDVI) ou .NET 8 para o ERP central',
      recommendedDatabase: 'PostgreSQL com PostGIS para polígonos de talhões e sincronização bi-direcional',
      recommendedCloud: 'Google Cloud Platform ou AWS com instâncias spot para processamento em lote',
      architectureHighlight:
        'Arquitetura Offline-First robusta com replicação local para nuvem assim que o dispositivo detecta sinal de internet.',
      lgpdConsiderations: [
        'Salvaguarda de dados de produtividade e margens de preço das fazendas',
        'Contratos digitais de parceria agrícola e arrendamento seguros',
        'Conformidade de dados de trabalhadores rurais sazonais'
      ]
    },
    fintech: {
      id: 'fintech',
      name: 'Fintechs & Serviços Financeiros',
      tagline: 'Open Finance, BaaS (Banking as a Service), conciliação bancária, esteiras de crédito e PIX.',
      iconName: 'Landmark',
      badge: 'Segurança Bancária & Baixa Latência',
      typicalNiches: [
        'Subadquirentes e Gateways de Pagamento',
        'Sociedades de Crédito Direto (SCD) e Factoring',
        'Plataformas de Conciliação e Gestão de Recebíveis',
        'Wallets e Carteiras Digitais de Benefícios',
        'Contabilidade Digital com Emissão de Boletos e PIX'
      ],
      primaryChallenges: [
        'Latência em operações de conciliação e risco de dupla liquidação financeira',
        'Fraudes em esteiras de onboarding de novos clientes (esteira de KYC)',
        'Exigências regulatórias rigorosas do Banco Central (BACEN / Resolução 85)',
        'Indisponibilidade de APIs bancárias e falhas de split de pagamento'
      ],
      recommendedFrontend: 'Angular 18 ou React com arquitetura modular, CSP rígido e proteção contra injeção',
      recommendedBackend: 'Java (Spring Boot 3) ou Go para microserviços transacionais com consistência ACID rígida',
      recommendedDatabase: 'PostgreSQL particionado + Ledger imutável para lançamentos contábeis de partida dobrada',
      recommendedCloud: 'AWS ou Google Cloud com certificação SOC 2 Type II e ISO 27001 nativas',
      architectureHighlight:
        'Domain-Driven Design (DDD) com Event Sourcing, Idempotência de transações e isolamento de redes (VPC privada).',
      lgpdConsiderations: [
        'Atendimento aos padrões do Banco Central para segurança cibernética e sigilo bancário',
        'Anonimização e mascaramento de chaves PIX e CPF em logs de aplicação',
        'Políticas de retenção de dados financeiros de no mínimo 5 a 10 anos'
      ]
    }
  },
  companySizes: {
    micro: {
      label: 'Microempresa (ME / MEI)',
      badge: '1 a 9 colaboradores',
      description: 'Operação enxuta, foco em eliminar trabalho manual urgente e baixo custo fixo.',
      costMultiplier: 0.65,
      timeMultiplier: 0.75,
      typicalStaff: '1 Dev Full-Stack Sênior + 1 Designer UI/UX pontual'
    },
    small: {
      label: 'Pequena Empresa (EPP)',
      badge: '10 a 49 colaboradores',
      description: 'Processos estruturados, múltiplos departamentos e necessidade de integração interna.',
      costMultiplier: 1.0,
      timeMultiplier: 1.0,
      typicalStaff: '1 Tech Lead + 1 Dev Frontend + 1 Dev Backend + 1 QA'
    },
    medium: {
      label: 'Média Empresa',
      badge: '50 a 199 colaboradores',
      description: 'Alto volume de transações, filiais ou setores bem definidos, necessita de alta disponibilidade.',
      costMultiplier: 1.85,
      timeMultiplier: 1.5,
      typicalStaff: '1 Arquiteto de Software + 2 Devs Fullstack + 1 DevOps + 1 QA + 1 PM'
    },
    corporate: {
      label: 'Grande Empresa / Corporativo',
      badge: '200+ colaboradores',
      description: 'Operação complexa, governança corporativa, múltiplos legados e auditoria de segurança.',
      costMultiplier: 3.2,
      timeMultiplier: 2.2,
      typicalStaff: 'Squad dedicada com Arquiteto Cloud, Especialista em Segurança, Tech Lead e múltiplos Devs'
    }
  },
  maturityLevels: {
    manual: {
      label: 'Processos Manuais e Papel',
      badge: 'Nível 1 - Analógico',
      summary: 'Registros em cadernos, anotações e mensagens em aplicativos sem centralização.',
      complexityFactor: 1.15
    },
    spreadsheets: {
      label: 'Planilhas Descentralizadas (Excel / Sheets)',
      badge: 'Nível 2 - Disperso',
      summary: 'Arquivos isolados por departamento, sem integridade referencial ou validações automáticas.',
      complexityFactor: 1.0
    },
    legacy_desktop: {
      label: 'Sistemas Desktop Legados',
      badge: 'Nível 3 - On-Premise',
      summary: 'Softwares antigos instalados em máquinas locais com banco de dados on-premise defasado.',
      complexityFactor: 1.3
    },
    isolated_cloud: {
      label: 'SaaS Isolados na Nuvem',
      badge: 'Nível 4 - Fragmentado',
      summary: 'Uso de ferramentas modernas, porém operando em silos sem APIs ou sincronização central.',
      complexityFactor: 1.1
    }
  },
  projectGoals: {
    process_automation: {
      label: 'Automação de Processos & Workflows Internos',
      badge: 'Redução de Custos Imediata',
      description: 'Eliminar retrabalho manual, unificar formulários e automatizar aprovações de ponta a ponta.',
      baseCapex: 24000,
      baseOpexMonthly: 450,
      baseWeeks: 8
    },
    client_portal_app: {
      label: 'Portal Web / App Dedicado para Clientes',
      badge: 'Foco em Receita & Experiência',
      description: 'Interface self-service para clientes realizarem pedidos, acompanharem status e pagarem.',
      baseCapex: 35000,
      baseOpexMonthly: 750,
      baseWeeks: 12
    },
    custom_erp: {
      label: 'Sistema de Gestão sob Medida (ERP / CRM Core)',
      badge: 'Transformação Estrutural',
      description: 'Substituição de ferramentas genéricas por um sistema 100% aderente às regras únicas do negócio.',
      baseCapex: 52000,
      baseOpexMonthly: 1200,
      baseWeeks: 16
    },
    bi_data_intelligence: {
      label: 'Business Intelligence & Central de Dados',
      badge: 'Decisões Baseadas em Dados',
      description: 'Pipelines ETL, data warehouse unificado e dashboards executivos com indicadores de lucro e gargalos.',
      baseCapex: 28000,
      baseOpexMonthly: 850,
      baseWeeks: 10
    },
    cloud_migration: {
      label: 'Modernização e Migração para a Nuvem',
      badge: 'Escalabilidade & Alta Disponibilidade',
      description: 'Migração de sistemas locais para arquitetura moderna de contêineres e banco de dados gerenciado.',
      baseCapex: 32000,
      baseOpexMonthly: 950,
      baseWeeks: 10
    }
  },
  assessmentTemplates: {
    hoursUnit: 'h/semana',
    costBreakdown: [
      {
        category: 'Arquitetura de Software & Design de Banco',
        description: 'Modelagem relacional, definições de segurança, infraestrutura como código (IaC) e fluxogramas.'
      },
      {
        category: 'Desenvolvimento Backend & APIs de Integração',
        description: 'Regras de negócio, autenticação, integrações com sistemas externos e barramentos assíncronos.'
      },
      {
        category: 'Desenvolvimento Frontend & Interface de Usuário (UI/UX)',
        description: 'Construção dos layouts responsivos, componentes interativos, validação de formulários e dashboards.'
      },
      {
        category: 'Garantia de Qualidade (QA) & Testes Automatizados',
        description: 'Testes de carga, testes unitários, testes de regressão e homologação de cenários reais.'
      },
      {
        category: 'DevOps, Deploy Automatizado & Treinamento de Equipe',
        description: 'Configuração de pipelines CI/CD, monitoramento de métricas, alertas e workshops operacionais.'
      }
    ],
    squad: [
      {
        role: 'Tech Lead / Arquiteto de Software',
        allocationFull: 'Integral (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Pontual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Desenvolvedor Backend Sênior',
        allocationFull: 'Integral (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Pontual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Desenvolvedor Frontend / UI Specialist',
        allocationFull: 'Integral (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Pontual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Engenheiro de DevOps & Nuvem',
        allocationFull: 'Integral (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Pontual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Analista de Qualidade e Homologação',
        allocationFull: 'Integral (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Pontual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      }
    ],
    cloudTiers: {
      micro: 'Nível Entrada (Basic Tier)',
      small: 'Nível Padrão (Standard Tier)',
      enterprise: 'Nível Enterprise (Multi-AZ)'
    },
    cloudServices: [
      'Contêineres Gerenciados com Auto-Scaling',
      'Banco de Dados Relacional Gerenciado com Backup Diário',
      'Camada de Cache em Memória (Redis)',
      'Armazenamento de Arquivos em Nuvem com CDN',
      'Monitoramento de Aplicação e Logs Centralizados'
    ],
    rolloutPhases: [
      {
        phase: 'Fase 1: Fundação & Protótipo Funcional (MVP)',
        durationPrefix: 'Semanas',
        durationJoin: 'a',
        deliverables: [
          'Ambiente de Cloud configurado com CI/CD automatizado',
          'Modelagem do banco de dados e autenticação segura',
          'Telas essenciais do fluxo principal validadas com os usuários chave'
        ]
      },
      {
        phase: 'Fase 2: Integração de Negócio & Migração de Dados',
        durationPrefix: 'Semanas',
        durationJoin: 'a',
        deliverables: [
          'Migração e saneamento dos dados anteriores (planilhas ou legado)',
          'Conexão com APIs externas (pagamento, emissão fiscal ou mensageria)',
          'Validação das regras de negócio complexas do nicho'
        ]
      },
      {
        phase: 'Fase 3: Homologação, Treinamento & Go-Live Seguro',
        durationPrefix: 'Semanas',
        durationJoin: 'a',
        deliverables: [
          'Testes de carga simulando picos operacionais de acesso',
          'Treinamento prático da equipe com manuais e vídeos gravados',
          'Virada de chave assistida (Go-Live) com suporte presencial/remoto de plantão'
        ]
      }
    ],
    risks: [
      {
        risk: 'Resistência cultural da equipe interna na transição do processo anterior',
        mitigation: 'Envolver líderes de operação desde a prototipação inicial e oferecer interface simples e familiar.'
      },
      {
        risk: 'Inconsistência de dados herdados da base antiga',
        mitigation: 'Criar scripts de validação e limpeza prévia (data cleaning) antes da importação definitiva.'
      },
      {
        risk: 'Subdimensionamento da capacidade de infraestrutura em horários de pico',
        mitigation: 'Implementar escalabilidade horizontal automática (auto-scaling) e filas de desacoplamento.'
      },
      {
        risk: 'Indisponibilidade de internet ou falha de conectividade local',
        mitigation: 'Construção de arquitetura resiliente com cache local e sincronização automática.'
      }
    ],
    complianceChecklist: [
      'Termo de Consentimento e Política de Privacidade atualizados para a nova aplicação',
      'Logs de auditoria imutáveis para rastrear quem criou, editou ou apagou qualquer registro crítico',
      'Criptografia de ponta a ponta em repouso (banco de dados) e em trânsito (HTTPS/TLS 1.3)',
      'Rotina de backups diários automatizados com teste de restauração periódico (RTO/RPO definidos)',
      'Controle de acesso granular baseado em perfis (RBAC - Role Based Access Control)'
    ]
  },
  pdf: {
    headerBrand: 'CODECOMPARE // INTELIGÊNCIA EM TI & ARQUITETURA',
    previewBadge: 'PREVIEW GRATUITO // RESUMO',
    previewBannerTitle: 'SUMÁRIO EXECUTIVO PRELIMINAR',
    previewHeaderSubtitle: 'Plano de viabilidade orçamentária e técnica para o segmento de',
    coverBadge: 'DOSSIÊ TÉCNICO & ORÇAMENTÁRIO',
    coverTitle: 'Dossiê de Digitalização & Arquitetura',
    coverSubtitle: 'Diagnóstico de TI:',
    generatedAt: 'Gerado em:',
    preparedFor: 'Elaborado sob medida para:',
    sectorLabel: 'Setor:',
    nicheLabel: 'Nicho:',
    sizeLabel: 'Porte Organizacional:',
    maturityLabel: 'Maturidade Digital Atual:',
    goalLabel: 'Objetivo Primário:',
    customScopeLabel: 'Requisitos Informados:',
    metaHeaders: {
      colA: 'PORTE DA EMPRESA',
      colB: 'MATURIDADE ATUAL',
      labelCompany: 'OBJETIVO PRINCIPAL',
      labelEmail: 'E-mail:',
      labelPhone: 'Solicitante:'
    },
    summaryTitle: 'PREMISSAS DO DIAGNÓSTICO',
    capexLabel: 'INVESTIMENTO ESTIMADO (CAPEX)',
    capexSubnote: 'Custo total de desenvolvimento do software sob medida.',
    opexLabel: 'CUSTO OPERACIONAL MENSAL (OPEX)',
    opexSubnote: 'Hospedagem em nuvem gerenciada, banco de dados e APIs.',
    timelineLabel: 'CRONOGRAMA DE ROLLOUT',
    sprintsSubnotePrefix: 'Equivalente a aprox.',
    sprintsSubnoteSuffix: 'sprints quinzenais',
    sprintsUnit: 'sprints ágeis quinzenais',
    weeksUnit: 'Semanas',
    perMonth: '/mês',
    rangeJoin: 'a',
    premisesTitle: 'RESUMO DO IMPACTO OPERACIONAL',
    operationalImpactPrefix:
      'A modernização planejada garante escalabilidade e segurança para substituir processos legados, eliminando retrabalho manual e preparando a empresa para crescimento sustentável com previsibilidade financeira.',
    challengesTitle: 'Desafios Críticos no Setor de',
    recommendedStackTitle: 'Arquitetura Tecnológica Recomendada',
    recommendedStackPreviewTitle: 'Especificação Arquitetural e Seleção de Tecnologias',
    stackLayers: {
      frontend: 'Camada Frontend',
      backend: 'Camada Backend & APIs',
      database: 'Banco de Dados & Cache',
      cloud: 'Provedor de Nuvem'
    },
    stackLayerNames: {
      frontend: '1. Camada de Frontend & Experiência do Usuário (UI/UX)',
      backend: '2. Camada de Backend & Regras de Negócio (APIs)',
      database: '3. Camada de Persistência & Cache em Memória',
      cloud: '4. Infraestrutura em Nuvem & DevOps'
    },
    techRecommendedPrefix: 'Tecnologia Indicada:',
    stackGenericSpecs: [
      {
        title: '1. Camada de Frontend & Experiência do Usuário (UI/UX)',
        detail:
          'Responsável pela interface do usuário, velocidade de carregamento, responsividade mobile e conformidade com padrões modernos de acessibilidade. Garante adoção intuitiva pelos colaboradores e clientes.'
      },
      {
        title: '2. Camada de Backend & Regras de Negócio (APIs)',
        detail:
          'Processamento central, validação de regras fiscais/contábeis, autenticação OAuth2/JWT e barramento de integração com mensageria. Desenvolvido sob arquitetura RESTful/gRPC com documentação OpenAPI/Swagger.'
      },
      {
        title: '3. Camada de Persistência & Cache em Memória',
        detail:
          'Banco relacional com índices otimizados (B-Tree/GIN), particionamento de tabelas históricas e cache-aside com Redis para reduzir o tempo de resposta das consultas frequentes em mais de 80%.'
      },
      {
        title: '4. Infraestrutura em Nuvem & DevOps',
        detail:
          'Provisionamento como código (Terraform), contêineres Docker, rotinas diárias automatizadas de backup e monitoramento contínuo de métricas de CPU, latência e disponibilidade com alertas.'
      }
    ],
    inviteBoxTitle: 'Deseja a Análise Analítica Completa (Dossiê de 6 Páginas)?',
    inviteBoxLines: [
      'A versão detalhada inclui: Cronograma semana a semana de sprints, Composição exata do Squad,',
      'Breakdown de horas por etapa, Matriz de Riscos com mitigações e Checklist de conformidade LGPD.',
      'Acesse no portal CodeCompare e desbloqueie o Dossiê Completo gratuitamente.'
    ],
    completeTitle: 'DOSSIÊ ARQUITETURAL COMPLETO',
    completeHeaderBrand: 'DOSSIÊ ARQUITETURAL COMPLETO',
    completePage2Title: 'ARQUITETURA DE SOFTWARE & STACKS',
    completeArchTitle: 'Destaque Arquitetural Recomendado',
    completeArchHighlightLabel: 'PADRÃO ARQUITETURAL RECOMENDADO',
    completeChallengesTitle: 'Diretrizes de Proteção de Dados (LGPD) no Nicho',
    completePage3Title: 'BREAKDOWN DE CUSTOS & EQUIPE',
    completePage3Subtitle: 'Detalhamento do Investimento por Fase de Engenharia',
    completePage4Title: 'CRONOGRAMA DE ROLLOUT & SPRINTS',
    completePage4Subtitle: 'Cronograma Faseado em Sprints',
    completePage5Title: 'SIMULAÇÃO CLOUD & MATRIZ DE RISCOS',
    completePage6Title: 'LGPD, GOVERNANÇA & PRÓXIMOS PASSOS',
    cloudTitle: 'Dimensionamento Cloud:',
    cloudProviderLabel: 'Infraestrutura recomendada:',
    cloudTierLabel: 'Plano Sugerido:',
    cloudEstMonthlyLabel: 'Custo Previsto:',
    cloudServicesLabel: 'Serviços Gerenciados Inclusos na Arquitetura:',
    breakdownTitle: 'Detalhamento do Investimento por Fase de Engenharia',
    colCategory: 'Fase / Disciplina',
    colHours: 'Horas',
    colShare: '%',
    colInvestment: 'Faixa Estimada (R$)',
    squadTitle: 'Composição Recomendada do Squad de Desenvolvimento',
    squadAllocPrefix: 'Alocação:',
    squadCountPrefix: 'Quantidade:',
    rolloutTitle: 'Cronograma Faseado em Sprints',
    rolloutDurationPrefix: 'Duração Estimada:',
    rolloutNotesTitle: 'METODOLOGIA DE GO-LIVE PROGRESSIVO',
    rolloutNotes: [
      'Recomendamos a estratégia de lançamento em "Canary Release" ou pilotos em grupos fechados de colaboradores antes da virada total da operação, garantindo que qualquer ajuste em regras de negócio seja realizado sem impacto no atendimento ao cliente ou faturamento.'
    ],
    risksTitle: 'Matriz de Riscos Estratégicos & Planos de Mitigação',
    impactBadgePrefix: 'Impacto',
    mitigationPrefix: 'Ação Mitigadora:',
    complianceTitle: 'Checklist de Segurança & Conformidade Legal (LGPD)',
    lgpdTitle: 'Diretrizes de Proteção de Dados (LGPD) no Nicho',
    nextStepsTitle: 'Próximos Passos para Viabilizar seu Projeto',
    nextSteps: [
      '1. Validação de Escopo: Refinar os requisitos específicos com os stakeholders de operação e finanças.',
      '2. Prova de Conceito (PoC): Implementar um protótipo navegável em 10 dias úteis para validação visual.',
      '3. Contratação e Alocação da Squad: Definir se a equipe será interna, terceirizada ou modelo híbrido.',
      '4. Kickoff da Sprint 1: Setup do repositório, pipeline CI/CD e banco de dados na nuvem.'
    ],
    finalCtaTitle: 'CodeCompare // Consultoria & Engenharia de Software Especializada',
    finalCtaBody: 'Precisa de Apoio Técnico para Tirar Esse Projeto do Papel? Nossos especialistas auxiliam desde a validação de arquitetura até a entrega final.',
    finalCtaContact: 'E-mail: eduardolessa2011@gmail.com  |  Portal: https://www.devedulessa.com.br/',
    footerPage: 'Página',
    footerOf: 'de',
    footerDisclaimer: 'Relatório confidencial gerado por CodeCompare - Análise Técnica & Orçamentária',
    footerPreviewNote: 'DESAFIOS & DIRETRIZES DO SETOR',
    currencyLocale: 'pt-BR',
    currencyCode: 'BRL',
    filenamePreviewPrefix: 'CodeCompare_Preview_',
    filenameCompletePrefix: 'CodeCompare_Dossie_Completo_'
  }
};

export default businessPt;
