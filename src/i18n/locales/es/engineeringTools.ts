import { EngineeringToolsLocale } from '../../types.ts';

const engineeringToolsEs: EngineeringToolsLocale = {
  matrixUi: {
    badge: 'Herramienta Interactiva de Ingeniería',
    title: 'Matriz de Decisión Arquitectónica',
    subtitle:
      'Simula los requisitos específicos de tu próximo proyecto y recibe una recomendación técnica pragmática basada en trade-offs reales de producción.',
    sectionTitle: 'Define las Restricciones de tu Proyecto',
    q1Label: '1. Naturaleza del Producto de Software',
    q1Options: [
      { id: 'mvp', label: 'MVP / Startup', desc: 'Foco en velocidad' },
      { id: 'saas', label: 'SaaS / E-commerce', desc: 'Alto tráfico y SEO' },
      { id: 'enterprise', label: 'Dashboard Corporativo', desc: 'Gobernanza y datos' },
      { id: 'realtime', label: 'Tiempo Real / IoT', desc: 'Latencia crítica' }
    ],
    q2Label: '2. Perfil de Especialidad del Equipo Técnico',
    q2Options: [
      { id: 'junior', label: 'Equipo Generalista (JS/TS)', desc: 'Menor curva de aprendizaje' },
      { id: 'polyglot', label: 'Equipo Sénior Políglota', desc: 'Domina múltiples lenguajes' },
      { id: 'corporate', label: 'Perfil Enterprise', desc: 'C#, Java, ecosistema Microsoft/Oracle' }
    ],
    q3Label: '3. Volumen Estimado de Solicitudes',
    q3Options: [
      { id: 'small', label: 'Hasta 50k req/día', desc: 'Tráfico inicial de lanzamiento' },
      { id: 'medium', label: '100k a 5M req/día', desc: 'Tráfico comercial consolidado' },
      { id: 'massive', label: 'Escala Hipercrítica (> 20M)', desc: 'Microsegundos de latencia' }
    ],
    diagBadge: 'Diagnóstico Automatizado',
    diagTitle: 'Arquitectura Recomendada para tu Escenario',
    diagSeal: '✓ Dictamen de Ingeniería',
    cardFrontend: 'Frontend',
    cardFrontendBtn: 'Ver comparativa en el blog',
    cardBackend: 'Backend API',
    cardBackendBtn: 'Ver código del CRUD',
    cardDatabase: 'Base de Datos',
    cardDatabaseBtn: 'Ver estrategias de datos',
    warningPrefix: 'Punto de Atención en Producción:',
    recommendations: {
      mvp: {
        frontend: {
          name: 'Vue.js 3 o React',
          subTab: 'vue',
          tag: 'Time-to-Market',
          reason: 'Máxima velocidad de implementación y baja barrera de entrada.'
        },
        backend: {
          name: 'Python (FastAPI)',
          subTab: 'python',
          tag: 'Prototipado Ágil',
          reason: 'Documentación OpenAPI Swagger automática y tipado rápido con Pydantic.'
        },
        database: {
          name: 'PostgreSQL Monolítico',
          subTab: 'relational',
          tag: 'Simplicidad Operativa',
          reason: 'No introduzcas Redis o NoSQL antes de validar la tracción del producto.'
        },
        warnings: [
          'Mantén las reglas de negocio desacopladas del framework para facilitar futuras migraciones de backend.'
        ]
      },
      saas: {
        frontend: {
          name: 'React 19 + TanStack Query',
          subTab: 'react',
          tag: 'Frontend Flexible',
          reason:
            'Mayor ecosistema de componentes y disponibilidad de ingenieros en el mercado, con caché asíncrono robusto.'
        },
        backend: {
          name: '.NET 8 (C# Minimal APIs)',
          subTab: 'dotnet',
          tag: 'Alto Rendimiento',
          reason: 'Excelente relación costo-beneficio de CPU/RAM en producción con tipado estricto en compilación.'
        },
        database: {
          name: 'PostgreSQL + Redis (Cache-Aside)',
          subTab: 'relational',
          tag: 'Persistencia Híbrida',
          reason: 'PostgreSQL garantiza integridad ACID para entidades clave y Redis absorbe picos de lecturas repetitivas.'
        },
        warnings: ['Monitorea la latencia del pool de conexiones conforme aumente el número de réplicas de pods.']
      },
      enterprise: {
        frontend: {
          name: 'Angular 17+ (Signals Standalone)',
          subTab: 'angular',
          tag: 'Gobernanza Corporativa',
          reason:
            'Estructura prescriptiva con convenciones estrictas que reducen el riesgo de arquitecturas divergentes en equipos grandes.'
        },
        backend: {
          name: 'Java (Spring Boot 3) o .NET 8',
          subTab: 'java',
          tag: 'Estándar Enterprise',
          reason: 'Madurez de herramientas, enorme ecosistema corporativo y soporte a largo plazo (LTS).'
        },
        database: {
          name: 'PostgreSQL con Particionamiento Declarativo',
          subTab: 'relational',
          tag: 'Escala Relacional',
          reason: 'Particionamiento por fecha en tablas de auditoría e índices B-Tree bien dimensionados.'
        },
        warnings: ['Evita el acoplamiento excesivo a librerías propietarias de proveedores cloud.']
      },
      realtime: {
        frontend: {
          name: 'Vue.js 3.4 (Composition API)',
          subTab: 'vue',
          tag: 'Reactividad Ligera',
          reason: 'Reactividad granular sin Virtual DOM pesado, ideal para telemetría de alta frecuencia.'
        },
        backend: {
          name: 'Go (Fiber + Goroutines)',
          subTab: 'go',
          tag: 'Latencia Mínima',
          reason:
            'Consumo mínimo de RAM por conexión (~2 KB por Goroutine) soportando decenas de miles de clientes simultáneos.'
        },
        database: {
          name: 'Redis Streams / Cassandra + PostgreSQL',
          subTab: 'nosql',
          tag: 'Write-Heavy NoSQL',
          reason: 'Cassandra o Redis para ingesta masiva de telemetría sin saturar la base relacional.'
        },
        warnings: ['Vigila fugas de Goroutines si el contexto de cancelación no se propaga adecuadamente.']
      }
    },
    massiveTrafficBackend: {
      name: 'Go (Fiber) o .NET 8',
      subTab: 'go',
      tag: 'Concurrencia Masiva',
      reason: 'Lenguajes compilados que eliminan la sobrecarga de intérpretes dinámicos bajo millones de solicitudes.'
    }
  },
  fpUi: {
    badge: 'Métricas de Ingeniería de Software • APF / IFPUG',
    title: 'Análisis de Puntos de Función (APF) y Dimensionamiento de Software',
    subtitle:
      'Medición del tamaño funcional de software según los estándares internacionales IFPUG (ISO/IEC 20926) y NESMA. Descubre cómo cada función de datos y transacción se correlaciona con FastAPI, .NET 8, Spring Boot 3, React, Vue, Angular y Bases de Datos en Horas por Punto de Función (h/PF), líneas equivalentes y mantenimiento anual.',
    methodologyBadge: 'Normativa IFPUG CPM 4.3.1',
    normIso: 'Norma: ISO/IEC 20926:2009',
    normIsbsg: 'Tasa de Entrega: Benchmarks ISBSG',
    normNeutral: 'Independencia Tecnológica Funcional',
    kpiTotalPfa: 'Tamaño Funcional (PFA)',
    kpiEffortHours: 'Esfuerzo Total',
    kpiTimeline: 'Plazo Estimado',
    kpiEstimatedBugs: 'Defectos Esperados',
    weeksUnit: 'semanas',
    sprintsUnit: 'sprints',
    hoursUnit: 'horas',
    hoursShortUnit: 'h',
    slocLinesUnit: 'líneas',
    maintUnit: 'h/año',
    calcSectionTitle: 'Calculadora de Puntos de Función y Dimensionamiento de Sprint',
    calcSectionSubtitle:
      'Ingresa la cantidad de funciones de tu proyecto, elige el stack objetivo y calcula esfuerzo en horas, sprints y tamaño de equipo.',
    calculatorKicker: 'Simulador Interactivo',
    calculatorLoadExampleBtn: 'Cargar Ejemplo Estándar',
    calculatorDownloadSheetBtn: 'Descargar Hoja (.csv / Excel)',
    calculatorDownloadSheetTitle: 'Exportar hoja formateada para Excel / Google Sheets',
    calculatorStep1Title: '1. Conteo de Funciones de Datos y Transacciones',
    calculatorStep2Title: '2. Parámetros Tecnológicos y de Equipo',
    pfUnit: 'PF',
    elements: {
      ALI: {
        label: 'Archivos Lógicos Internos (Tablas / Colecciones)',
        low: 'Baja (7 PF)',
        med: 'Media (10 PF)',
        high: 'Alta (15 PF)'
      },
      AIE: {
        label: 'Archivos de Interfaz Externa (APIs Externas)',
        low: 'Baja (5 PF)',
        med: 'Media (7 PF)',
        high: 'Alta (10 PF)'
      },
      EE: {
        label: 'Entradas Externas (POST, PUT, DELETE, Escrituras)',
        low: 'Baja (3 PF)',
        med: 'Media (4 PF)',
        high: 'Alta (6 PF)'
      },
      SE: {
        label: 'Salidas Externas (Informes, Cálculos, Webhooks)',
        low: 'Baja (4 PF)',
        med: 'Media (5 PF)',
        high: 'Alta (7 PF)'
      },
      CE: {
        label: 'Consultas Externas (GETs simples, búsquedas paginadas)',
        low: 'Baja (3 PF)',
        med: 'Media (4 PF)',
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
      { id: '1', label: '1 Semana (Ciclos ultra-ágiles)' },
      { id: '2', label: '2 Semanas (Scrum estándar de mercado)' },
      { id: '4', label: '4 Semanas (Ciclos mensuales)' }
    ],
    summaryKicker: 'Resumen del Dimensionamiento',
    functionalSizeLabel: 'Tamaño Funcional:',
    rawFpLabel: 'Puntos Sin Ajustar (PFSA):',
    totalEffortTitle: 'Esfuerzo Total',
    avgPrefix: 'Prom.:',
    estTimelineTitle: 'Plazo Estimado',
    devsShortUnit: 'devs',
    estCodeTitle: 'Código Estimado',
    linesApproxPrefix: '~',
    linesApproxUnit: 'líneas',
    expectedDefectsTitle: 'Defectos Esperados',
    bugsUnit: 'bugs',
    prodYearNote: 'En producción (~1 año)',
    layerDistLabel: 'Distribución de Esfuerzo por Capa:',
    backendLayerLabel: 'Backend',
    frontendLayerLabel: 'Frontend',
    dbLayerLabel: 'Base de Datos',
    annualMaintLabel: 'Mantenimiento Anual Proyectado:',
    perYearUnit: 'h/año',
    spreadsheetBtnTitle: 'Descargar Hoja de Estimación (.csv / Excel)',
    spreadsheetBtnLabel: 'Descargar Hoja de Estimación (.csv / Excel)',
    downloadSuccessMsg: '¡Hoja generada con éxito! Revisa tus descargas.',
    excelCompatNote:
      'Compatible con Microsoft Excel, Google Sheets y LibreOffice Calc. Codificado en UTF-8 con separador estándar.',
    downloadCsvBtn: 'Descargar Hoja (.csv)',
    downloadedCsvBtn: '¡Hoja Exportada!',
    dataFunctionsTitle: 'Funciones de Datos (Almacenamiento)',
    txFunctionsTitle: 'Funciones de Transacción (Procesamiento)',
    lowLabel: 'Baja',
    medLabel: 'Media',
    highLabel: 'Alta',
    unadjustedFpLabel: 'PF Sin Ajustar (PFSA)',
    vafLabel: 'Factor de Ajuste (VAF)',
    adjustedFpLabel: 'Puntos Ajustados (PFA)',
    stackConfigTitle: 'Configuración Tecnológica',
    backendLabel: 'Lenguaje Backend',
    frontendLabel: 'Framework Frontend',
    databaseLabel: 'Repositorio de Datos',
    complexityLabel: 'Complejidad / Factor VAF',
    complexityOptions: [
      { id: 'low', label: 'Baja (VAF 0.85 - CRUD simple)', factorLabel: '0.85x' },
      { id: 'standard', label: 'Media (VAF 1.00 - Estándar corporativo)', factorLabel: '1.00x' },
      { id: 'high', label: 'Alta (VAF 1.15 - Concurrencia y mTLS)', factorLabel: '1.15x' },
      { id: 'critical', label: 'Crítica (VAF 1.30 - Bancario / 24x7 / SLA)', factorLabel: '1.30x' }
    ],
    teamSizeLabel: 'Tamaño del Equipo Devs',
    devsUnit: 'devs',
    sprintLenLabel: 'Duración del Sprint',
    gscToggleShow: 'Ver las 14 GSC',
    gscToggleHide: 'Ocultar Lista',
    gscTitle: 'Las 14 Características Generales de Sistemas (GSC)',
    gscFormulaDesc:
      'Utilizadas en la metodología clásica IFPUG para calcular el Grado de Influencia (DI) y el Factor de Ajuste de Valor: VAF = 0.65 + (0.01 × TDI).',
    matrixKicker: 'Fundamentos Normativos',
    matrixExportBtn: 'Exportar Matriz APF (.csv)',
    matrixExportTitle: 'Exportar hoja de puntos de función',
    colAbbr: 'Sigla',
    referenceTableTitle: 'Matriz Canónica de Complejidad y Pesos (IFPUG CPM 4.3.1)',
    referenceTableSubtitle:
      'El Análisis de Puntos de Función clasifica los requisitos del usuario en 5 componentes fundamentales, divididos en Funciones de Datos (lo que almacena) y Funciones de Transacción (lo que procesa).',
    colElement: 'Elemento Funcional',
    colDesc: 'Descripción',
    colWeights: 'Pesos (Baja / Media / Alta)',
    colMapping: 'Mapeo en Arquitectura Moderna',
    benchmarkKicker: 'Productividad y Benchmark',
    benchmarkDownloadBtn: 'Descargar Métricas APF (.csv)',
    benchmarkDownloadTitle: 'Descargar hoja con métricas de productividad',
    techBenchmarkTitle: 'Tasa de Entrega por Tecnología (Horas / PF y SLOC Equivalente)',
    techBenchmarkSubtitle:
      'Aunque el Punto de Función es neutral al lenguaje, el esfuerzo real de ingeniería para implementar 1 PF varía notablemente según ecosistema, abstracción, tipado estático y madurez de librerías.',
    filterAll: 'Todas',
    filterBackend: 'Backend',
    filterFrontend: 'Frontend',
    filterDatabase: 'Bases de Datos',
    colTechVersion: 'Tecnología y Versión',
    colAvgRate: 'Tasa Media (h / PF)',
    colTypicalRange: 'Rango Típico',
    colSlocPerFp: 'SLOC / PF',
    colMaintYear: 'Soporte (h/PF/año)',
    colBugsPer1000: 'Bugs / 1.000 PF',
    colFactors: 'Impulsores de Productividad y Recomendaciones',
    catLabels: {
      backend: 'backend',
      frontend: 'frontend',
      database: 'database'
    },
    hoursPerFpLabel: 'h/PF',
    slocPerFpLabel: 'SLOC / PF',
    maintLabel: 'Soporte/año',
    defectsLabel: 'Defectos / 1k PF',
    useCaseLabel: 'Caso de uso recomendado:',
    caseStudyKicker: 'Caso de Estudio Práctico',
    caseStudyTitle: 'Mapeo Real: Plataforma Fintech de Pagos Instantáneos (PIX)',
    caseStudySubtitle:
      'Ejemplo práctico de conteo de Puntos de Función en una arquitectura moderna basada en los stacks de este portal: persistencia transaccional en PostgreSQL, catálogo polimórfico en MongoDB y caché en Redis.',
    caseStudyTotalLabel: 'Total del Caso de Estudio',
    caseStudyPfnaTotalLabel: 'Total de Puntos de Función Sin Ajustar (PFSA):',
    caseStudyVafPrefix: 'Con Factor de Ajuste VAF 1.15 (Sistemas de Alta Concurrencia) =',
    colCaseType: 'Tipo',
    colCaseItem: 'Componente de Negocio',
    colCaseComplexity: 'Complejidad',
    colCaseFp: 'Puntos',
    colCaseImpl: 'Implementación Técnica en el Stack',
    complexityDisplay: {
      Baixa: 'Baja',
      Média: 'Media',
      Alta: 'Alta'
    },
    dateLocale: 'es-ES',
    csvFilename: 'estimacion_puntos_de_funcion.csv',
    csv: {
      docTitle: 'INFORME DE DIMENSIONAMIENTO Y ESTIMACIÓN DE PUNTOS DE FUNCIÓN (APF)',
      portalLabel: 'Portal',
      portalVal: 'CodeCompare - Dev Tech Blog',
      methodLabel: 'Metodología Normativa',
      methodVal: 'IFPUG CPM 4.3.1 (ISO/IEC 20926:2009) & NESMA',
      dateLabel: 'Fecha de Generación',
      sec1Title: '--- 1. RESUMEN EJECUTIVO ---',
      sec1Headers: ['Métrica', 'Valor', 'Unidad', 'Observación'],
      pfnaLabel: 'Puntos de Función Sin Ajustar (PFSA)',
      pfnaNote: 'Suma de funciones de datos y transacciones',
      complexityLabel: 'Clasificación de Complejidad',
      complexityNote: 'Basada en los 14 factores GSC',
      vafLabel: 'Factor de Ajuste (VAF)',
      vafNote: 'Multiplicador de requisitos no funcionales',
      pfaLabel: 'Puntos de Función Ajustados (PFA)',
      pfaNote: 'Tamaño funcional normalizado final',
      avgProdLabel: 'Productividad Promedio Blended',
      avgProdNote: 'Media ponderada del stack seleccionado',
      effortLabel: 'Esfuerzo Total Estimado',
      effortNote: 'Horas netas de desarrollo',
      teamLabel: 'Tamaño del Equipo',
      teamNote: 'Equipo dedicado de ingeniería',
      sprintLabel: 'Duración del Sprint',
      sprintNote: 'Ciclo de iteración Scrum',
      timelineLabel: 'Plazo Estimado de Entrega',
      timelineApproxPrefix: 'Aproximadamente',
      timelineApproxSuffix: 'semanas',
      kslocLabel: 'Código Fuente Equivalente (KSLOC)',
      kslocLinesPrefix: '~',
      kslocLinesSuffix: 'líneas de código',
      defectsLabel: 'Densidad de Defectos Proyectada',
      defectsNote: 'Estimación de incidentes en producción en el 1º año',
      maintLabel: 'Mantenimiento Anual Proyectado',
      maintNote: 'Mantenimiento correctivo y preventivo anual',
      sec2Title: '--- 2. CONTEO DETALLADO POR TIPO DE FUNCIÓN (IFPUG) ---',
      sec2Headers: ['Sigla', 'Componente Funcional', 'Baja (cant)', 'Media (cant)', 'Alta (cant)', 'Total Ocurrencias', 'Subtotal PF'],
      components: [
        { abbr: 'ALI', name: 'Archivos Lógicos Internos (Tablas / Entidades Propias)' },
        { abbr: 'AIE', name: 'Archivos de Interfaz Externa (APIs Consumidas / BDs Externas)' },
        { abbr: 'EE', name: 'Entradas Externas (POST, PUT, DELETE, Escrituras)' },
        { abbr: 'SE', name: 'Salidas Externas (Informes, Cálculos, Webhooks)' },
        { abbr: 'CE', name: 'Consultas Externas (GETs simples, búsquedas paginadas)' }
      ],
      subtotalDataLabel: 'Subtotal Funciones de Datos (ALI + AIE)',
      subtotalTxLabel: 'Subtotal Funciones de Transacción (EE + SE + CE)',
      totalPfnaLabel: 'Total General PFSA',
      sec3Title: '--- 3. COMPOSICIÓN DEL STACK TECNOLÓGICO Y ESFUERZO PONDERADO ---',
      sec3Headers: ['Capa', 'Tecnología Seleccionada', 'Tasa Productividad (h/PF)', 'SLOC / PF', 'Distribución de Esfuerzo (%)', 'Horas Estimadas (h)'],
      layerBackend: 'Backend',
      layerFrontend: 'Frontend',
      layerDb: 'Base de Datos',
      totalIntegrated: 'Total Integrado',
      fullStackLabel: 'Stack Full-Stack Seleccionado'
    }
  },
  fpWeights: [
    {
      type: 'ALI',
      name: 'Archivo Lógico Interno (ILF)',
      description: 'Grupo lógico de datos mantenido íntegramente dentro de la frontera de la aplicación.',
      low: 7,
      medium: 10,
      high: 15,
      mapping:
        'Tablas en PostgreSQL (3FN / particionadas), colecciones en MongoDB (documentos embebidos) o estructuras Redis de persistencia primaria.'
    },
    {
      type: 'AIE',
      name: 'Archivo de Interfaz Externa (EIF)',
      description: 'Grupo lógico de datos referenciado por la aplicación, pero mantenido por otro sistema.',
      low: 5,
      medium: 7,
      high: 10,
      mapping:
        'APIs bancarias, pasarelas de pago (Stripe, Asaas, PIX), proveedores de identidad (OAuth2, Keycloak, Auth0) y registros externos.'
    },
    {
      type: 'EE',
      name: 'Entrada Externa (EI)',
      description: 'Proceso elemental que procesa datos provenientes del exterior de la frontera para alterar ALIs.',
      low: 3,
      medium: 4,
      high: 6,
      mapping:
        'Endpoints HTTP POST / PUT / PATCH / DELETE en FastAPI, Controllers .NET 8 o Spring Boot que realizan validación y guardado.'
    },
    {
      type: 'SE',
      name: 'Salida Externa (EO)',
      description: 'Proceso elemental que envía datos hacia fuera de la frontera con lógica matemática o actualización de estado.',
      low: 4,
      medium: 5,
      high: 7,
      mapping:
        'Generación de extractos con conciliación contable, agregación estadística en tiempo real, informes fiscales y webhooks con HMAC.'
    },
    {
      type: 'CE',
      name: 'Consulta Externa (EQ)',
      description: 'Proceso elemental que envía datos hacia fuera de la frontera sin fórmulas matemáticas complejas.',
      low: 3,
      medium: 4,
      high: 6,
      mapping:
        'Endpoints HTTP GET de consulta simple, paginación con filtros indexados (B-Tree en Postgres, GIN, índices compuestos MongoDB).'
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
        'Validación automática vía Pydantic v2 sin boilerplate',
        'Documentación Swagger / OpenAPI generada de forma nativa',
        'Sintaxis expresiva y tipado moderno (PEP 585/604)',
        'Scaffolding rápido de rutas asíncronas'
      ],
      recommendedUseCase:
        'Microservicios ágiles, APIs de agregación, pipelines analíticos e integraciones con Machine Learning.'
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
        'Roslyn source generators reduciendo el overhead de runtime',
        'Entity Framework Core 8 con mapeo SQL optimizado',
        'Inyección de dependencias y middlewares en código conciso',
        'Verificación estricta de tipos en compilación'
      ],
      recommendedUseCase:
        'Aplicaciones de alto throughput, backends bancarios, plataformas transaccionales y entornos corporativos.'
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
        'Ecosistema Spring de madurez inigualable (Security, Batch, Cloud)',
        'Virtual Threads (Project Loom) simplificando el I/O',
        'Mayor cantidad de boilerplate y convenciones de anotaciones',
        'Curva inicial de configuración más extensa'
      ],
      recommendedUseCase:
        'Grandes ecosistemas enterprise, sistemas bancarios con cumplimiento estricto y plataformas globales.'
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
        'Reactividad granular nativa (Refs / Reactive) similar a Signals',
        'Single File Components (SFC) con script setup ergonómico',
        'Directivas integradas (v-if, v-for, v-model) de baja fricción',
        'Pinia y Vue Router oficiales y estandarizados'
      ],
      recommendedUseCase:
        'Paneles corporativos, SaaS de rápida salida al mercado e interfaces densas orientadas a datos.'
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
        'Ecosistema gigantesco de componentes listos y librerías',
        'Mayor carga cognitiva gestionando re-renders y memoización',
        'Requiere elegir librerías para enrutamiento, formularios y estado',
        'Máxima flexibilidad arquitectónica'
      ],
      recommendedUseCase:
        'Sistemas complejos multiequipo, design systems universales y plataformas con amplia contratación.'
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
        'Estructura opinativa estricta con CLI integrada',
        'Inyección de dependencias nativa en el frontend',
        'Signals nativos prescindiendo de Zone.js en nuevos proyectos',
        'Mayor esfuerzo inicial compensado en el mantenimiento a largo plazo'
      ],
      recommendedUseCase:
        'Aplicaciones enterprise críticas, portales públicos y corporaciones con decenas de desarrolladores simultáneos.'
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
        'Garantías ACID estrictas evitando anomalías de integridad',
        'Soporte para migraciones declarativas (Flyway, Liquibase, EF Migrations)',
        'Índices GIN para JSONB y B-Tree robustos',
        'Extensiones nativas (pg_stat_statements, pgvector)'
      ],
      recommendedUseCase:
        'Repositorio primario estándar para entidades relacionales, libros contables y catálogos estructurados.'
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
        'Schema-on-read acelerando el desarrollo inicial',
        'Estructura JSON/BSON alineada directamente a objetos frontend',
        'Mayor complejidad en migraciones de esquemas polimórficos',
        'Sharding nativo para particionamiento horizontal'
      ],
      recommendedUseCase:
        'Catálogos con atributos variables, telemetría de eventos, registros de auditoría y logs.'
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
        'Estructuras listas en memoria (Strings, Hashes, Sets, Streams)',
        'Reducción drástica de consultas al banco primario',
        'Exige disciplina en TTL, evicción y serialización',
        'Integración simple mediante drivers nativos'
      ],
      recommendedUseCase: 'Capa de aceleración de consultas, bloqueos distribuidos (Redlock) y sesiones temporales.'
    }
  ],
  fpCaseStudy: [
    {
      type: 'ALI',
      name: 'Registro de Cuentas y Titularidad',
      description: 'Almacena perfil del cliente, estado de alta, claves de autenticación e historial de privacidad.',
      complexity: 'Média',
      points: 10,
      techImplementation:
        'PostgreSQL 16 (tablas normalizadas `accounts`, `holders` con llaves foráneas y triggers de auditoría).'
    },
    {
      type: 'ALI',
      name: 'Libro Mayor Contable (Ledger de Transacciones)',
      description: 'Registro inmutable de asientos de débito y crédito, saldos consolidados y conciliación.',
      complexity: 'Alta',
      points: 15,
      techImplementation:
        'PostgreSQL 16 con particionamiento mensual por fecha y tablas con checksum criptográfico de integridad.'
    },
    {
      type: 'ALI',
      name: 'Catálogo de Productos y Tarifas',
      description: 'Productos de inversión y crédito con atributos dinámicos y reglas de precios.',
      complexity: 'Média',
      points: 10,
      techImplementation:
        'MongoDB 7 (colección polimórfica `financial_products` con índices compuestos por categoría y elegibilidad).'
    },
    {
      type: 'ALI',
      name: 'Sesiones y Tokens de Autenticación Activa',
      description: 'Tokens JWT revocables, estado de rate-limiting por IP y bloqueos distribuidos de concurrencia.',
      complexity: 'Baixa',
      points: 7,
      techImplementation: 'Redis 7 (Hashes para sesiones y Sorted Sets para limitación de tasa por ventana deslizante).'
    },
    {
      type: 'AIE',
      name: 'Pasarela de Pagos Instantáneos (SPI / Banco Central / PIX)',
      description: 'Interfaz de comunicación con el sistema de pagos instantáneos para validación y liquidación.',
      complexity: 'Alta',
      points: 10,
      techImplementation: 'Microservicio mTLS integrado con mensajería asíncrona Kafka/RabbitMQ y Webhooks.'
    },
    {
      type: 'AIE',
      name: 'Servicio Antifraude y Score Crediticio',
      description: 'Consulta externa a burós de crédito y motores ML para evaluación de riesgo en tiempo real.',
      complexity: 'Média',
      points: 7,
      techImplementation: 'Llamada gRPC / REST con circuit-breaker resiliente (Polly en .NET o Resilience4j en Spring).'
    },
    {
      type: 'EE',
      name: 'Inicio de Transferencia Financiera (PIX / Bancaria)',
      description: 'Recibe orden de pago, valida límites operativos y saldo, y encola la transacción.',
      complexity: 'Alta',
      points: 6,
      techImplementation: 'Endpoint POST /transfers con validación estricta (Pydantic / FluentValidation) y transacción atómica.'
    },
    {
      type: 'EE',
      name: 'Actualización de Límites Operativos y Dispositivo',
      description: 'Altera límites diarios y nocturnos del usuario previa validación biométrica.',
      complexity: 'Média',
      points: 4,
      techImplementation: 'Endpoint PUT /account/limits idempotente con registro de auditoría.'
    },
    {
      type: 'EE',
      name: 'Registro / Portabilidad de Clave Instantánea',
      description: 'Agrega o transfiere claves de direccionamiento vinculadas a la cuenta corriente.',
      complexity: 'Média',
      points: 4,
      techImplementation: 'Endpoint POST /pix/keys con validación estricta de formato.'
    },
    {
      type: 'SE',
      name: 'Extracto Consolidado con Conciliación y Tributos',
      description: 'Genera extracto con cálculo dinámico de rendimientos diarios, impuestos y PDF firmado.',
      complexity: 'Alta',
      points: 7,
      techImplementation: 'Generación asíncrona de PDF cifrado y despacho mediante cola.'
    },
    {
      type: 'SE',
      name: 'Notificación Push / Webhook de Liquidación',
      description: 'Emite evento estructurado en tiempo real firmado con HMAC-SHA256 hacia la app móvil.',
      complexity: 'Média',
      points: 5,
      techImplementation: 'Dispatcher de WebSockets / SSE con respaldo en Firebase Cloud Messaging.'
    },
    {
      type: 'CE',
      name: 'Consulta de Saldo y Límites Disponibles en Tiempo Real',
      description: 'Devuelve el saldo actualizado incluyendo retenciones pendientes en caché.',
      complexity: 'Baixa',
      points: 3,
      techImplementation: 'Endpoint GET /balance con estrategia Cache-Aside en Redis y respaldo en Postgres.'
    },
    {
      type: 'CE',
      name: 'Listado de Transacciones Paginadas con Filtros',
      description: 'Busca historial filtrado por rango de fechas, tipo (crédito/débito) y texto descriptivo.',
      complexity: 'Média',
      points: 4,
      techImplementation:
        'Endpoint GET /transfers?page=1&size=20 respaldado por índice compuesto B-Tree en (account_id, created_at DESC).'
    }
  ],
  fpGscList: [
    { id: 1, name: 'Comunicación de Datos', description: 'Grado en que la aplicación envía o recibe datos por redes de telecomunicación.' },
    { id: 2, name: 'Procesamiento Distribuido', description: 'Distribución de datos y lógica entre distintos nodos, contenedores y servicios.' },
    { id: 3, name: 'Rendimiento', description: 'Requisitos estrictos de tiempo de respuesta y caudal definidos por los usuarios.' },
    { id: 4, name: 'Configuración Fuertemente Utilizada', description: 'Restricciones operativas que exigen máxima eficiencia de hardware.' },
    { id: 5, name: 'Tasa de Transacciones', description: 'Volumen de transacciones por segundo que exige control fino de concurrencia.' },
    { id: 6, name: 'Entrada de Datos Online', description: 'Porcentaje de transacciones originadas directamente desde interfaces web/móviles.' },
    { id: 7, name: 'Eficiencia del Usuario Final', description: 'Enfoque en ergonomía, atajos, ayudas visuales y flujos ágiles.' },
    { id: 8, name: 'Actualización Online', description: 'Actualización inmediata de los archivos lógicos internos durante la transacción.' },
    { id: 9, name: 'Procesamiento Complejo', description: 'Presencia de lógica matemática compleja, criptografía o múltiples flujos.' },
    { id: 10, name: 'Reusabilidad', description: 'Código y componentes diseñados para reutilizarse en múltiples aplicaciones.' },
    { id: 11, name: 'Facilidad de Instalación', description: 'Nivel de automatización del despliegue (CI/CD, contenedores, Kubernetes).' },
    { id: 12, name: 'Facilidad de Operación', description: 'Soporte a respaldos automáticos, telemetría (OpenTelemetry), health checks y alertas.' },
    { id: 13, name: 'Múltiples Sitios', description: 'Necesidad de operar en múltiples regiones cloud, centros de datos o sucursales.' },
    { id: 14, name: 'Facilidad de Cambios', description: 'Arquitectura modularizada con bajo acoplamiento para absorber nuevos requisitos.' }
  ]
};

export default engineeringToolsEs;
