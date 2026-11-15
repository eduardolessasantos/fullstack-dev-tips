import { BusinessLocale } from '../../types.ts';

const businessEs: BusinessLocale = {
  ui: {
    badge: 'PLANIFICACIÓN ESTRATÉGICA DE TI Y PRESUPUESTO',
    title: 'Diagnóstico de Digitalización y Presupuesto Empresarial',
    subtitle:
      'Simula los costos reales de desarrollo, infraestructura en la nube, plazos en semanas y la arquitectura de software ideal adaptada con precisión al nicho comercial de tu empresa.',
    steps: [
      { step: 1, title: '1. Sector y Nicho', desc: 'Segmento económico' },
      { step: 2, title: '2. Tamaño de Empresa', desc: 'Volumen y personal' },
      { step: 3, title: '3. Madurez Digital', desc: 'Sistemas actuales' },
      { step: 4, title: '4. Objetivo Principal', desc: 'Meta del proyecto' }
    ],
    stepCounterPrefix: 'Etapa',
    stepCounterOf: 'de',
    step1Title: 'Selecciona el Sector de la Economía',
    step2Title: '¿Cuál es el Tamaño de la Organización?',
    sectorTitle: 'Selecciona el Sector de la Economía',
    sectorSubtitle: 'Cada industria posee patrones arquitectónicos y exigencias regulatorias únicas.',
    suggestedStackPrefix: 'Stack sugerido:',
    nichePrompt: '¿Cuál es el nicho específico o especialidad de la empresa?',
    nicheLabel: 'Nicho específico o especialidad',
    nichePlaceholder:
      'O escribe el nicho exacto (ej.: Distribuidora Farmacéutica, E-commerce de Repuestos Náuticos...)',
    sizeTitle: '¿Cuál es el Tamaño de la Organización?',
    sizeSubtitle: 'El tamaño del equipo y volumen transaccional calibran licencias, gobernanza y nube.',
    sizeLabel: 'Tamaño de la organización',
    typicalSquadPrefix: 'Squad típico:',
    maturityTitle: 'Madurez Digital Actual de la Empresa',
    maturitySubtitle: 'Impacta directamente la limpieza de datos y la curva de migración del equipo.',
    maturityLabel: 'Madurez digital actual',
    migrationFactorLabel: 'Factor de complejidad en migración:',
    goalTitle: '¿Cuál es la Principal Meta del Proyecto?',
    goalSubtitle: 'Define el alcance central de la primera entrega (MVP) y la arquitectura primaria.',
    goalLabel: 'Meta principal del proyecto',
    baseTimelineLabel: 'Plazo base estimado:',
    customReqLabel: 'Observaciones o Requisitos Específicos de tu Negocio (Opcional)',
    customReqPlaceholder:
      "Ej.: 'Necesitamos integrar con el ERP existente vía API y operar offline en almacén'...",
    prevStepBtn: '← Etapa Anterior',
    nextStepBtn: 'Siguiente Etapa',
    generateBtn: 'Generar Informe',
    projectionTitle: 'Proyección Presupuestaria y Técnica',
    estimatedForPrefix: 'Cálculo estimado para:',
    previewBtnTitle: 'Descargar resumen ejecutivo preliminar en PDF',
    completeBtnTitle: 'Acceder al dossier analítico completo de 6 páginas',
    previewSuccessNotice: '¡PDF Preview generado con éxito! Revisa tus descargas.',
    completeSuccessNotice:
      '¡Dossier Analítico Completo (6 páginas) generado con éxito! Tus datos fueron recibidos por nuestro equipo.',
    downloadPreviewPdf: 'Descargar Preview Gratuito (.pdf)',
    downloadFullPdf: 'Obtener Dossier Analítico Completo (6 Páginas)',
    resetBtn: 'Reiniciar',
    kpiCapex: 'Inversión (Capex)',
    kpiOpex: 'Costo Nube (Opex)',
    kpiTimeline: 'Tiempo de Rollout',
    kpiSprints: 'Tamaño del Squad',
    perMonth: '/mes',
    weeks: 'semanas',
    sprintsOf2Weeks: 'sprints quincenales ágiles',
    professionalsUnit: 'especialistas',
    squadSummaryNote: 'Tech Lead, Desarrolladores Sénior, DevOps y Analista QA.',
    archBadgeNote: 'Integración nativa con las guías técnicas de CodeCompare',
    archPatternLabel: 'Patrón Arquitectónico:',
    challengesTitle: 'Desafíos Operativos Mapeados',
    archTitle: 'Arquitectura Recomendada para',
    cloudSimTitle: 'Simulación Cloud',
    tierLabel: 'Nivel:',
    monthlyInfraEst: 'Estimación mensual de infra:',
    breakdownTitle: 'Desglose de la Inversión',
    squadTitle: 'Composición Recomendada del Squad',
    rolloutTitle: 'Cronograma de Implementación por Fases',
    risksTitle: 'Matriz de Riesgos Estratégicos',
    impactLabel: 'Impacto',
    mitigationLabel: 'Mitigación:',
    complianceTitle: 'Cumplimiento y Seguridad',
    lgpdSectorTitle: 'Directrices de Privacidad / LGPD del Sector',
    modalBadge: 'DOSSIER COMPLETO // 6 PÁGINAS',
    modalTitle: '¿Dónde debemos enviar tu Informe Analítico?',
    modalSubtitle:
      'El PDF completo se descargará de inmediato en tu dispositivo personalizado con el nombre de tu empresa.',
    modalNameLabel: 'Tu Nombre Completo *',
    modalNamePlaceholder: 'Ej.: Carlos Eduardo',
    modalEmailLabel: 'Correo Profesional *',
    modalEmailPlaceholder: 'carlos@empresa.com',
    modalPhoneLabel: 'WhatsApp / Teléfono',
    modalPhonePlaceholder: '+34 600 000 000',
    modalCompanyLabel: 'Nombre de la Empresa',
    modalCompanyPlaceholder: 'Ej.: Industrias Iberia S.A.',
    modalConsultCheck:
      'Deseo recibir contacto técnico de un especialista para presupuesto de squad o consultoría.',
    modalSubmitBtn: 'Generar y Descargar Dossier Completo (.pdf)',
    modalSubmittingBtn: 'Registrando y Generando Informe...',
    modalCancelBtn: 'Cancelar',
    modalPrivacyNote: 'Tus datos están protegidos conforme a la normativa vigente de privacidad (LGPD/GDPR).',
    formspreeLeadType: 'Lead B2B - Diagnóstico Business',
    formspreeNotProvided: 'No proporcionado',
    formspreeConsultYes: 'Sí, solicitar contacto técnico',
    formspreeConsultNo: 'Solo informe',
    formspreeNoCustomReq: 'Ninguno proporcionado',
    rangeJoin: 'a',
    impactMap: {
      Alto: 'Alto',
      Médio: 'Medio',
      Baixo: 'Bajo'
    }
  },
  sectors: {
    retail: {
      id: 'retail',
      name: 'Comercio y Retail / E-commerce',
      tagline: 'Ventas omnicanal, catálogo de productos, checkout de alta conversión y conciliación de inventarios.',
      iconName: 'ShoppingBag',
      badge: 'Alta Concurrencia y Picos de Tráfico',
      typicalNiches: [
        'E-commerce D2C y B2B',
        'Supermercados y Distribuidoras',
        'Tiendas de Moda y Calzado',
        'Farmacias y Cosmética',
        'Ferretería y Autopartes'
      ],
      primaryChallenges: [
        'Gestión de inventario en tiempo real entre tienda física y canal online',
        'Cuellos de botella en checkout durante campañas promocionales (Black Friday)',
        'Integración compleja con pasarelas de pago, antifraude y operadores logísticos',
        'Recuperación de carritos abandonados y personalización de ofertas'
      ],
      recommendedFrontend: 'React / Next.js con Tailwind CSS (SSR/SSG para SEO veloz)',
      recommendedBackend: 'Go (Fiber) o Node.js para microservicios de alta tasa de peticiones',
      recommendedDatabase: 'PostgreSQL (transaccional) + Redis (caché de catálogo y sesión)',
      recommendedCloud: 'AWS (CloudFront CDN, ECS Fargate, S3 y Aurora Serverless)',
      architectureHighlight:
        'Arquitectura desacoplada Headless Commerce con Cache-Aside y mensajería asíncrona para facturación fiscal.',
      lgpdConsiderations: [
        'Cifrado extremo a extremo de flujos de tarjetas (cumplimiento PCI-DSS)',
        'Consentimiento explícito para cookies de remarketing y analítica',
        'Anonimización del historial de compras tras expirar obligaciones fiscales'
      ]
    },
    industry: {
      id: 'industry',
      name: 'Industria y Manufactura',
      tagline: 'Planta de producción, automatización industrial, control OEE, telemetría de maquinaria y PCP.',
      iconName: 'Factory',
      badge: 'Planta Industrial y Resiliencia Operativa',
      typicalNiches: [
        'Metalmecánica y Mecanizado',
        'Alimentos y Bebidas',
        'Textil y Confección Industrial',
        'Química y Plásticos',
        'Mobiliario y Carpintería Industrial'
      ],
      primaryChallenges: [
        'Falta de visibilidad en tiempo real del OEE (Overall Equipment Effectiveness)',
        'Registro manual de producción generando mermas y retrasos en planificación',
        'Entornos industriales con conectividad intermitente (operación offline-first)',
        'Mantenimiento preventivo ausente causando paradas no programadas'
      ],
      recommendedFrontend: 'Vue 3 con Composition API (óptimo para pantallas de terminales HMI ágiles)',
      recommendedBackend: '.NET 8 (C#) o Java Spring Boot para procesamiento robusto y conexión PLC/SCADA',
      recommendedDatabase: 'PostgreSQL + TimescaleDB (métricas de telemetría IoT y sensores)',
      recommendedCloud: 'Microsoft Azure (Azure IoT Hub, Edge Computing y App Services)',
      architectureHighlight:
        'Arquitectura Edge-to-Cloud con procesamiento local en gateways industriales y sincronización periódica en la nube.',
      lgpdConsiderations: [
        'Protección de secretos industriales y propiedad intelectual de fórmulas/planos',
        'Control de acceso biométrico/credenciales acorde a datos sensibles',
        'Auditoría inmutable de registros de calidad y trazabilidad de lotes'
      ]
    },
    services: {
      id: 'services',
      name: 'Servicios y Empresas B2B',
      tagline: 'Órdenes de servicio digitales, agendas, tarificación dinámica, facturación recurrente y contratos.',
      iconName: 'Briefcase',
      badge: 'Eficiencia de Horas y Retención de Clientes',
      typicalNiches: [
        'Consultoras Legales, Contables y Financieras',
        'Empresas de Mantenimiento, Climatización y Facilities',
        'Agencias de Marketing, Diseño y Software',
        'Empresas de Seguridad y Tercerización',
        'Educación Corporativa y Formación'
      ],
      primaryChallenges: [
        'Falta de estandarización en órdenes de servicio y prueba digital de entrega',
        'Dificultad para medir la rentabilidad real por cliente y hora trabajada',
        'Retrabajo manual en contratos y cobros recurrentes (morosidad)',
        'Comunicación fragmentada entre equipos técnicos en campo y oficina'
      ],
      recommendedFrontend: 'React con Vite y Lucide Icons (dashboard administrativo veloz e intuitivo)',
      recommendedBackend: 'Python (FastAPI) o .NET 8 con generación automatizada de informes PDF',
      recommendedDatabase: 'PostgreSQL (relacional estructurado con JSONB para campos dinámicos)',
      recommendedCloud: 'Google Cloud Platform (Cloud Run, Cloud SQL y Firebase Cloud Messaging)',
      architectureHighlight:
        'Sistema multi-tenant con flujos configurables, firma digital integrada y PWA offline para equipos en campo.',
      lgpdConsiderations: [
        'Confidencialidad estricta de datos financieros y contractuales de clientes B2B',
        'Gestión automatizada de plazos de retención contractual',
        'Mecanismo de exportación de datos personales para derechos de acceso/portabilidad'
      ]
    },
    health: {
      id: 'health',
      name: 'Salud, Clínicas y Laboratorios',
      tagline: 'Historia Clínica Electrónica (HCE), telemedicina, agenda integrada y facturación médica.',
      iconName: 'Activity',
      badge: 'Máximo Rigor Regulatorio y Datos Sensibles',
      typicalNiches: [
        'Clínicas Médicas y Odontológicas Multiespecialidad',
        'Laboratorios de Análisis Clínicos e Imagen',
        'Hospitales de Pequeño y Mediano Porte',
        'Centros de Fisioterapia y Rehabilitación',
        'Clínicas y Hospitales Veterinarios'
      ],
      primaryChallenges: [
        'Exposición accidental de historiales clínicos e información médica confidencial',
        'Rechazos de facturación médica por incompatibilidades con estándares de aseguradoras',
        'Altas tasas de inasistencia (no-show) en citas programadas',
        'Lentitud al compartir informes pesados e imágenes diagnósticas (DICOM)'
      ],
      recommendedFrontend: 'Angular 18 Standalone o React con tipado estricto y accesibilidad WCAG',
      recommendedBackend: 'Java (Spring Boot 3) o .NET 8 con bus corporativo y auditoría inmutable',
      recommendedDatabase: 'PostgreSQL con cifrado de columnas (pgcrypto) y particionamiento temporal',
      recommendedCloud: 'AWS Healthcare o Google Cloud Healthcare API (cumplimiento HIPAA/LGPD)',
      architectureHighlight:
        'Microservicios con autenticación mTLS, registro inmutable (Audit Trail) y conectores seguros de mensajería clínica.',
      lgpdConsiderations: [
        'Tratamiento de datos médicos bajo categoría de datos personales especialmente protegidos',
        'Auditoría estricta de accesos: cada consulta al historial queda registrada y trazada',
        'Firma electrónica certificada para recetas y emisión de informes médicos'
      ]
    },
    logistics: {
      id: 'logistics',
      name: 'Logística, Transporte y Flotas',
      tagline: 'Ruteo inteligente, tracking de carga, telemetría de flota, cartas de porte electrónicas y SLA.',
      iconName: 'Truck',
      badge: 'Operación Crítica y Optimización de Rutas',
      typicalNiches: [
        'Transportadoras de Carga Fraccionada y Completa',
        'Operadores Logísticos y Almacenes Generales (WMS)',
        'Flotas Propias de Distribución Urbana',
        'Courier y Entregas Exprés (Last Mile)',
        'Transporte de Pasajeros y Chárter'
      ],
      primaryChallenges: [
        'Altos costos de combustible por falta de optimización automática de rutas',
        'Retrasos en emisión y validación por lotes de manifiestos y guías electrónicas',
        'Incertidumbre del cliente final sobre el estado exacto de la entrega en ruta',
        'Costoso mantenimiento correctivo y desgaste prematuro de flota'
      ],
      recommendedFrontend: 'React con soporte de mapas interactivos (MapLibre/Leaflet) y paneles en vivo',
      recommendedBackend: 'Go (Golang) de alta concurrencia para ingesta de GPS y Webhooks',
      recommendedDatabase: 'PostgreSQL + PostGIS (consultas geoespaciales) + Redis para posición en tiempo real',
      recommendedCloud: 'AWS (Kinesis / SQS para telemetría, EC2 y RDS PostGIS)',
      architectureHighlight:
        'Event-Driven Architecture (EDA) orientada a eventos de rastreador/GPS con colas resilientes y ruteo geoespacial.',
      lgpdConsiderations: [
        'Anonimización de geolocalización de conductores fuera del horario laboral comercial',
        'Protección criptográfica contra secuestro de datos de cargas de alto valor',
        'Cifrado de datos bancarios y liquidaciones de transportistas autónomos'
      ]
    },
    agro: {
      id: 'agro',
      name: 'Agronegocio y Campo Conectado',
      tagline: 'Gestión de campañas agrícolas, insumos, maquinaria, clima y trazabilidad ESG.',
      iconName: 'Trees',
      badge: 'Offline-First y Productividad en Campo',
      typicalNiches: [
        'Productores de Granos (Soja, Maíz, Trigo)',
        'Ganadería de Carne y Láctea',
        'Cooperativas Agrícolas y Acopios',
        'Fruticultura y Cultivos de Riego',
        'Distribuidoras de Insumos y Maquinaria Agrícola'
      ],
      primaryChallenges: [
        'Ausencia de internet estable en lotes agrícolas y establecimientos rurales',
        'Desperdicio de fitosanitarios y fertilizantes sin aplicación en tasa variable',
        'Falta de control preciso de costos por hectárea hasta el cierre de campaña',
        'Exigencias de compradores internacionales sobre trazabilidad verificable ESG'
      ],
      recommendedFrontend: 'React con PWA completo y Service Workers para persistencia offline vía IndexedDB',
      recommendedBackend: 'Python FastAPI (procesamiento satelital/NDVI) o .NET 8 para el ERP central',
      recommendedDatabase: 'PostgreSQL + PostGIS para polígonos de parcelas y sincronización bidireccional',
      recommendedCloud: 'Google Cloud Platform o AWS con instancias spot para procesamiento por lotes',
      architectureHighlight:
        'Arquitectura Offline-First resiliente con replicación hacia la nube apenas el dispositivo recupera cobertura.',
      lgpdConsiderations: [
        'Resguardo estricto de datos de productividad y márgenes por campaña agrícola',
        'Contratos digitales seguros de aparcería, arrendamiento y originación',
        'Cumplimiento de privacidad para personal agrícola temporal o zafral'
      ]
    },
    fintech: {
      id: 'fintech',
      name: 'Fintech y Servicios Financieros',
      tagline: 'Open Finance, BaaS, conciliación bancaria automatizada, scoring de crédito y pagos instantáneos.',
      iconName: 'Landmark',
      badge: 'Seguridad Bancaria y Baja Latencia',
      typicalNiches: [
        'Facilitadores y Pasarelas de Pago',
        'Plataformas de Crédito Digital y Factoring',
        'Conciliación de Tesorería y Cuentas por Cobrar',
        'Billeteras Corporativas y Beneficios',
        'Contabilidad Digital con Emisión Automatizada de Pagos'
      ],
      primaryChallenges: [
        'Latencia en conciliaciones y riesgo de doble liquidación financiera',
        'Fraudes de identidad sintética en flujos digitales de onboarding KYC/KYB',
        'Estrictas regulaciones de bancos centrales en ciberseguridad y continuidad operativa',
        'Caídas de APIs bancarias y fallos de recuperación en split de pagos'
      ],
      recommendedFrontend: 'Angular 18 o React modular con CSP estricta y defensa ante inyección',
      recommendedBackend: 'Java (Spring Boot 3) o Go para microservicios transaccionales con consistencia ACID',
      recommendedDatabase: 'PostgreSQL particionado + Ledger inmutable de partida doble',
      recommendedCloud: 'AWS o Google Cloud con certificaciones SOC 2 Type II e ISO 27001 nativas',
      architectureHighlight:
        'Domain-Driven Design (DDD) con Event Sourcing, idempotencia de transacciones y aislamiento VPC privado.',
      lgpdConsiderations: [
        'Cumplimiento integral de secreto bancario y normas de ciberseguridad financiera',
        'Enmascaramiento automático de identificadores fiscales y alias en logs de aplicación',
        'Políticas de retención inmutable de registros financieros de 5 a 10 años'
      ]
    }
  },
  companySizes: {
    micro: {
      label: 'Microempresa (1–9)',
      badge: '1 a 9 colaboradores',
      description: 'Operación ágil enfocada en eliminar tareas manuales urgentes con bajo costo fijo.',
      costMultiplier: 0.65,
      timeMultiplier: 0.75,
      typicalStaff: '1 Dev Full-Stack Sénior + 1 Diseñador UI/UX puntual'
    },
    small: {
      label: 'Pequeña Empresa (10–49)',
      badge: '10 a 49 colaboradores',
      description: 'Procesos estructurados, múltiples áreas y necesidad de integración interna confiable.',
      costMultiplier: 1.0,
      timeMultiplier: 1.0,
      typicalStaff: '1 Tech Lead + 1 Dev Frontend + 1 Dev Backend + 1 QA'
    },
    medium: {
      label: 'Mediana Empresa (50–199)',
      badge: '50 a 199 colaboradores',
      description: 'Alto volumen de transacciones, sucursales o áreas bien definidas con alta disponibilidad.',
      costMultiplier: 1.85,
      timeMultiplier: 1.5,
      typicalStaff: '1 Arquitecto de Software + 2 Devs Full-Stack + 1 DevOps + 1 QA + 1 PM'
    },
    corporate: {
      label: 'Gran Empresa / Corporativo (200+)',
      badge: '200+ colaboradores',
      description: 'Operación compleja, gobernanza corporativa, múltiples sistemas legado y auditoría de seguridad.',
      costMultiplier: 3.2,
      timeMultiplier: 2.2,
      typicalStaff: 'Squad dedicado con Arquitecto Cloud, Especialista en Seguridad, Tech Lead y múltiples Devs'
    }
  },
  maturityLevels: {
    manual: {
      label: 'Procesos Manuales y Papel',
      badge: 'Nivel 1 - Analógico',
      summary: 'Registros en papel, anotaciones y mensajes dispersos sin fuente centralizada.',
      complexityFactor: 1.15
    },
    spreadsheets: {
      label: 'Hojas de Cálculo Descentralizadas (Excel / Sheets)',
      badge: 'Nivel 2 - Disperso',
      summary: 'Archivos aislados por departamento, sin integridad referencial ni validaciones automáticas.',
      complexityFactor: 1.0
    },
    legacy_desktop: {
      label: 'Sistemas de Escritorio Legados',
      badge: 'Nivel 3 - On-Premise',
      summary: 'Software antiguo instalado en equipos locales con bases de datos obsoletas.',
      complexityFactor: 1.3
    },
    isolated_cloud: {
      label: 'Herramientas SaaS Aisladas en la Nube',
      badge: 'Nivel 4 - Fragmentado',
      summary: 'Uso de aplicaciones modernas operando en silos sin APIs ni sincronización central.',
      complexityFactor: 1.1
    }
  },
  projectGoals: {
    process_automation: {
      label: 'Automatización de Procesos y Flujos Internos',
      badge: 'Reducción de Costos Inmediata',
      description: 'Eliminar retrabajo manual, unificar formularios y automatizar aprobaciones extremo a extremo.',
      baseCapex: 24000,
      baseOpexMonthly: 450,
      baseWeeks: 8
    },
    client_portal_app: {
      label: 'Portal Web / App Dedicado para Clientes',
      badge: 'Foco en Ingresos y Experiencia',
      description: 'Interfaz self-service para que clientes realicen pedidos, sigan estados y paguen online.',
      baseCapex: 35000,
      baseOpexMonthly: 750,
      baseWeeks: 12
    },
    custom_erp: {
      label: 'Sistema de Gestión a Medida (ERP / CRM Core)',
      badge: 'Transformación Estructural',
      description: 'Sustitución de herramientas genéricas por un sistema 100% adaptado a tus reglas únicas.',
      baseCapex: 52000,
      baseOpexMonthly: 1200,
      baseWeeks: 16
    },
    bi_data_intelligence: {
      label: 'Business Intelligence y Centro de Datos',
      badge: 'Decisiones Basadas en Datos',
      description: 'Pipelines ETL, data warehouse unificado y tableros ejecutivos con KPIs de margen y cuellos de botella.',
      baseCapex: 28000,
      baseOpexMonthly: 850,
      baseWeeks: 10
    },
    cloud_migration: {
      label: 'Modernización y Migración a la Nube',
      badge: 'Escalabilidad y Alta Disponibilidad',
      description: 'Migración de sistemas locales hacia arquitectura moderna de contenedores y bases gestionadas.',
      baseCapex: 32000,
      baseOpexMonthly: 950,
      baseWeeks: 10
    }
  },
  assessmentTemplates: {
    hoursUnit: 'h/semana',
    costBreakdown: [
      {
        category: 'Arquitectura de Software y Diseño de Datos',
        description: 'Modelado relacional, arquitectura de seguridad, Infraestructura como Código (IaC) y diagramas.'
      },
      {
        category: 'Desarrollo Backend y APIs de Integración',
        description: 'Reglas de negocio, autenticación, integraciones externas y mensajería asíncrona.'
      },
      {
        category: 'Desarrollo Frontend e Interfaz de Usuario (UI/UX)',
        description: 'Layouts responsivos, componentes interactivos, validación de formularios y tableros.'
      },
      {
        category: 'Aseguramiento de Calidad (QA) y Pruebas Automatizadas',
        description: 'Pruebas de carga, unitarias, regresión y homologación de escenarios reales.'
      },
      {
        category: 'DevOps, Despliegue Automatizado y Capacitación',
        description: 'Pipelines CI/CD, observabilidad, alertas operativas y talleres para el equipo.'
      }
    ],
    squad: [
      {
        role: 'Tech Lead / Arquitecto de Software',
        allocationFull: 'Tiempo completo (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Puntual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Desarrollador Backend Sénior',
        allocationFull: 'Tiempo completo (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Puntual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Desarrollador Frontend / Especialista UI',
        allocationFull: 'Tiempo completo (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Puntual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Ingeniero DevOps y Cloud',
        allocationFull: 'Tiempo completo (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Puntual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      },
      {
        role: 'Analista de Calidad y Homologación (QA)',
        allocationFull: 'Tiempo completo (40h/semana)',
        allocationPartial: 'Parcial (20h/semana)',
        allocationPunctual: 'Puntual (15h/semana)',
        allocationFinal: 'Fase final (20h/semana)'
      }
    ],
    cloudTiers: {
      micro: 'Nivel Inicial (Basic Tier)',
      small: 'Nivel Estándar (Standard Tier)',
      enterprise: 'Nivel Enterprise (Multi-AZ)'
    },
    cloudServices: [
      'Contenedores Gestionados con Auto-Scaling',
      'Base de Datos Relacional Gestionada con Backup Diario',
      'Capa de Caché en Memoria (Redis)',
      'Almacenamiento de Archivos en la Nube con CDN',
      'Monitoreo de Aplicaciones y Logs Centralizados'
    ],
    rolloutPhases: [
      {
        phase: 'Fase 1: Cimientos y Prototipo Funcional (MVP)',
        durationPrefix: 'Semanas',
        durationJoin: 'a',
        deliverables: [
          'Entorno cloud configurado con CI/CD automatizado',
          'Modelado de base de datos y autenticación segura',
          'Pantallas esenciales del flujo principal validadas con usuarios clave'
        ]
      },
      {
        phase: 'Fase 2: Integraciones de Negocio y Migración de Datos',
        durationPrefix: 'Semanas',
        durationJoin: 'a',
        deliverables: [
          'Migración y saneamiento de datos históricos (hojas o legado)',
          'Conexión con APIs externas (pagos, facturación o mensajería)',
          'Validación de reglas complejas específicas del nicho'
        ]
      },
      {
        phase: 'Fase 3: Homologación, Capacitación y Go-Live Seguro',
        durationPrefix: 'Semanas',
        durationJoin: 'a',
        deliverables: [
          'Pruebas de carga simulando picos operativos reales',
          'Formación práctica del equipo con manuales y videos grabados',
          'Puesta en producción asistida (Go-Live) con soporte de guardia'
        ]
      }
    ],
    risks: [
      {
        risk: 'Resistencia cultural del equipo interno durante la transición del flujo anterior',
        mitigation: 'Involucrar líderes operativos desde el prototipado inicial y ofrecer una interfaz clara y ágil.'
      },
      {
        risk: 'Inconsistencia en datos heredados de la base anterior',
        mitigation: 'Ejecutar scripts de validación y limpieza previa (data cleaning) antes de la importación final.'
      },
      {
        risk: 'Subdimensionamiento de capacidad de infraestructura en horas pico',
        mitigation: 'Implementar escalabilidad horizontal automática (auto-scaling) y colas de desacoplamiento.'
      },
      {
        risk: 'Inestabilidad de internet o cortes de conectividad local',
        mitigation: 'Construir arquitectura resiliente con caché local y sincronización automática.'
      }
    ],
    complianceChecklist: [
      'Términos de Consentimiento y Política de Privacidad actualizados para la nueva aplicación',
      'Logs de auditoría inmutables para rastrear creación, edición o borrado de registros críticos',
      'Cifrado extremo a extremo en reposo (base de datos) y en tránsito (HTTPS/TLS 1.3)',
      'Rutina de respaldos diarios automatizados con pruebas periódicas de restauración (RTO/RPO)',
      'Control de acceso granular basado en roles (RBAC)'
    ]
  },
  pdf: {
    headerBrand: 'CODECOMPARE // INTELIGENCIA TI Y ARQUITECTURA',
    previewBadge: 'PREVIEW GRATUITO // RESUMEN',
    previewBannerTitle: 'RESUMEN EJECUTIVO PRELIMINAR',
    previewHeaderSubtitle: 'Plan de viabilidad presupuestaria y técnica para el segmento de',
    coverBadge: 'DOSSIER TÉCNICO Y PRESUPUESTARIO',
    coverTitle: 'Dossier de Digitalización y Arquitectura',
    coverSubtitle: 'Diagnóstico TI:',
    generatedAt: 'Generado el:',
    preparedFor: 'Elaborado a medida para:',
    sectorLabel: 'Sector:',
    nicheLabel: 'Nicho:',
    sizeLabel: 'Tamaño Organizacional:',
    maturityLabel: 'Madurez Digital Actual:',
    goalLabel: 'Objetivo Primario:',
    customScopeLabel: 'Requisitos Indicados:',
    metaHeaders: {
      colA: 'TAMAÑO DE EMPRESA',
      colB: 'MADUREZ ACTUAL',
      labelCompany: 'OBJETIVO PRINCIPAL',
      labelEmail: 'Correo:',
      labelPhone: 'Solicitante:'
    },
    summaryTitle: 'PREMISAS DEL DIAGNÓSTICO',
    capexLabel: 'INVERSIÓN ESTIMADA (CAPEX)',
    capexSubnote: 'Costo total de desarrollo del software a medida.',
    opexLabel: 'COSTO OPERATIVO MENSUAL (OPEX)',
    opexSubnote: 'Alojamiento cloud gestionado, base de datos y APIs.',
    timelineLabel: 'CRONOGRAMA DE ROLLOUT',
    sprintsSubnotePrefix: 'Equivalente a aprox.',
    sprintsSubnoteSuffix: 'sprints quincenales',
    sprintsUnit: 'sprints ágiles quincenales',
    weeksUnit: 'Semanas',
    perMonth: '/mes',
    rangeJoin: 'a',
    premisesTitle: 'RESUMEN DEL IMPACTO OPERATIVO',
    operationalImpactPrefix:
      'La modernización planificada sustituye procesos frágiles por una infraestructura escalable, eliminando retrabajo manual, resguardando los datos críticos y preparando a la empresa para crecer con previsibilidad.',
    challengesTitle: 'Desafíos Críticos en',
    recommendedStackTitle: 'Arquitectura Tecnológica Recomendada',
    recommendedStackPreviewTitle: 'Especificación Arquitectónica y Selección Tecnológica',
    stackLayers: {
      frontend: 'Capa Frontend',
      backend: 'Capa Backend y APIs',
      database: 'Base de Datos y Caché',
      cloud: 'Proveedor Cloud'
    },
    stackLayerNames: {
      frontend: '1. Capa Frontend y Experiencia de Usuario (UI/UX)',
      backend: '2. Capa Backend y Reglas de Negocio (APIs)',
      database: '3. Capa de Persistencia y Caché en Memoria',
      cloud: '4. Infraestructura Cloud y DevOps'
    },
    techRecommendedPrefix: 'Tecnología Indicada:',
    stackGenericSpecs: [
      {
        title: '1. Capa Frontend y Experiencia de Usuario (UI/UX)',
        detail:
          'Responsable de la interfaz, velocidad de carga, diseño móvil responsivo y accesibilidad moderna, facilitando una adopción rápida por parte de clientes y colaboradores.'
      },
      {
        title: '2. Capa Backend y Reglas de Negocio (APIs)',
        detail:
          'Procesamiento central, validaciones fiscales/contables, autenticación OAuth2/JWT y mensajería asíncrona bajo arquitectura RESTful/gRPC documentada con OpenAPI.'
      },
      {
        title: '3. Capa de Persistencia y Caché en Memoria',
        detail:
          'Motor relacional con índices B-Tree/GIN optimizados, particionamiento histórico y estrategia Cache-Aside en Redis reduciendo en más de 80% la latencia en lecturas.'
      },
      {
        title: '4. Infraestructura Cloud y DevOps',
        detail:
          'Infraestructura como Código (Terraform), contenedores Docker, respaldos diarios automatizados y observabilidad continua con alertas.'
      }
    ],
    inviteBoxTitle: '¿Deseas el Análisis Detallado Completo (Dossier de 6 Páginas)?',
    inviteBoxLines: [
      'La versión completa incluye: Cronograma por fases, Composición exacta del Squad,',
      'Desglose de horas por disciplina, Matriz de Riesgos con mitigaciones y Checklist de privacidad.',
      'Ingresa al portal CodeCompare para desbloquear el Dossier Completo sin costo.'
    ],
    completeTitle: 'DOSSIER ARQUITECTÓNICO COMPLETO',
    completeHeaderBrand: 'DOSSIER ARQUITECTÓNICO COMPLETO',
    completePage2Title: 'ARQUITECTURA DE SOFTWARE Y STACKS',
    completeArchTitle: 'Destaque Arquitectónico Recomendado',
    completeArchHighlightLabel: 'PATRÓN ARQUITECTÓNICO RECOMENDADO',
    completeChallengesTitle: 'Directrices de Protección de Datos en el Nicho',
    completePage3Title: 'DESGLOSE DE COSTOS Y EQUIPO',
    completePage3Subtitle: 'Detalle de Inversión por Fase de Ingeniería',
    completePage4Title: 'CRONOGRAMA DE ROLLOUT Y SPRINTS',
    completePage4Subtitle: 'Cronograma por Fases en Sprints',
    completePage5Title: 'SIMULACIÓN CLOUD Y MATRIZ DE RIESGOS',
    completePage6Title: 'GOBERNANZA, PRIVACIDAD Y PRÓXIMOS PASOS',
    cloudTitle: 'Dimensionamiento Cloud:',
    cloudProviderLabel: 'Infraestructura recomendada:',
    cloudTierLabel: 'Plan Sugerido:',
    cloudEstMonthlyLabel: 'Costo Previsto:',
    cloudServicesLabel: 'Servicios Gestionados Incluidos en la Arquitectura:',
    breakdownTitle: 'Detalle de Inversión por Fase de Ingeniería',
    colCategory: 'Fase / Disciplina',
    colHours: 'Horas',
    colShare: '%',
    colInvestment: 'Rango Estimado (Ref. R$)',
    squadTitle: 'Composición Recomendada del Squad de Desarrollo',
    squadAllocPrefix: 'Dedicación:',
    squadCountPrefix: 'Cantidad:',
    rolloutTitle: 'Cronograma por Fases en Sprints',
    rolloutDurationPrefix: 'Duración Estimada:',
    rolloutNotesTitle: 'METODOLOGÍA DE GO-LIVE PROGRESIVO',
    rolloutNotes: [
      'Recomendamos un despliegue mediante "Canary Release" o pilotos controlados antes del cambio operativo total, asegurando ajustes en reglas de negocio sin afectar la facturación ni la atención al cliente.'
    ],
    risksTitle: 'Matriz de Riesgos Estratégicos y Planes de Mitigación',
    impactBadgePrefix: 'Impacto',
    mitigationPrefix: 'Acción Mitigadora:',
    complianceTitle: 'Checklist de Seguridad y Cumplimiento Legal (LGPD)',
    lgpdTitle: 'Directrices de Protección de Datos en el Nicho',
    nextStepsTitle: 'Próximos Pasos para Viabilizar tu Proyecto',
    nextSteps: [
      '1. Validación de Alcance: Afinar requisitos críticos con responsables de operación y finanzas.',
      '2. Prueba de Concepto (PoC): Entregar un prototipo navegable en 10 días hábiles para validación visual.',
      '3. Asignación del Squad: Definir modelo interno, equipo dedicado o formato híbrido.',
      '4. Kickoff del Sprint 1: Configurar repositorio, pipeline CI/CD y base de datos en la nube.'
    ],
    finalCtaTitle: 'CodeCompare // Consultoría e Ingeniería de Software Especializada',
    finalCtaBody:
      '¿Necesitas acompañamiento técnico experto para llevar este proyecto del diseño a producción?',
    finalCtaContact: 'Correo: eduardolessa2011@gmail.com  |  Portal: https://www.devedulessa.com.br/',
    footerPage: 'Página',
    footerOf: 'de',
    footerDisclaimer: 'Informe confidencial generado por CodeCompare - Análisis Técnico y Presupuestario',
    footerPreviewNote: 'DESAFÍOS Y DIRECTRICES DEL SECTOR',
    currencyLocale: 'pt-BR',
    currencyCode: 'BRL',
    filenamePreviewPrefix: 'CodeCompare_Preview_',
    filenameCompletePrefix: 'CodeCompare_Dossier_Completo_'
  }
};

export default businessEs;
