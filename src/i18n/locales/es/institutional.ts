import { InstitutionalLocale } from '../../types.ts';

const institutionalEs: InstitutionalLocale = {
  about: {
    badge: 'E-E-A-T • Transparencia y Rigor Editorial',
    title: 'Sobre CodeCompare & Eduardo Lessa',
    subtitle:
      'Una plataforma de ingeniería de software diseñada para transformar el aprendizaje técnico en un ejercicio de contraste, pensamiento crítico y medición pragmática.',
    founderBadge: 'Ingeniero Fundador & Autor',
    role: 'Ingeniero de Software Full-Stack & Especialista en Arquitectura Distribuida',
    locationLine: 'devedulessa.com.br • eduardolessa2011@gmail.com • Río de Janeiro, Brasil',
    paragraphs: [
      'Con más de una década de experiencia desarrollando sistemas de alta criticidad, he participado en el diseño de microservicios resilientes, arquitecturas orientadas a eventos (EDA), pipelines de datos de alto rendimiento e interfaces web modernas para los sectores financiero, e-commerce y logístico.',
      'Durante años liderando equipos técnicos y formando a decenas de desarrolladores, detecté un hábito común en la industria: aprender por repetición mecánica o memorización de tutoriales superficiales tipo "To-Do List". Muchos copian código sin comprender el porqué de las decisiones arquitectónicas subyacentes.',
      'CodeCompare nació como una respuesta deliberada a esa brecha: construir un repositorio técnico vivo donde la misma solución de ingeniería se analiza lado a lado en los principales lenguajes, frameworks y bases de datos actuales.'
    ],
    contactBtn: 'Hablar con el Autor',
    methodTitle: 'Nuestra Metodología de Benchmarks & Verificación',
    methodSubtitle:
      'Ningún dato publicado en CodeCompare proviene de especulación ni opiniones vacías en redes sociales. Nuestras comparativas siguen criterios estrictos de ingeniería:',
    cards: [
      {
        step: '01. Entorno Aislado',
        title: 'Contenedores Dedicados',
        desc: 'Todas las pruebas de carga y consumo de memoria se ejecutan en instancias Linux aisladas con Docker, limitando vCPU y RAM para simular producción real.'
      },
      {
        step: '02. Métricas Reales',
        title: 'Percentiles p95 y p99',
        desc: 'No nos limitamos a promedios simples de latencia. Evaluamos la cola estadística de respuestas con herramientas estándar como k6 y Apache Bench.'
      },
      {
        step: '03. Código Canónico',
        title: 'Idiomático en Cada Stack',
        desc: 'No forzamos paradigmas de C# dentro de Go ni de React dentro de Angular. Cada fragmento sigue rigurosamente las guías oficiales de su propia comunidad.'
      }
    ],
    commitmentTitle: 'Compromiso con Contenido Autoral y Original',
    commitmentBody:
      'CodeCompare rechaza activamente la generación masiva de artículos vacíos mediante scraping automatizado. Todo el material, las tablas comparativas, los análisis de trade-offs y los diagramas conceptuales se redactan, revisan y mantienen manualmente para aportar valor real a la carrera de ingenieros de software.'
  },
  editorial: {
    badge: 'Ética & Gobernanza Editorial',
    title: 'Directrices Editoriales de CodeCompare',
    subtitle:
      'Nuestra declaración formal de transparencia, independencia técnica, metodología de revisión por pares y criterios de corrección de erratas.',
    principles: [
      {
        num: '1',
        title: 'Independencia Editorial',
        desc: 'CodeCompare no acepta pagos, patrocinios ocultos ni favores comerciales para promover o desfavorecer ningún framework, nube o empresa de software. Nuestras comparativas son estrictamente agnósticas y guiadas por métricas de ingeniería.'
      },
      {
        num: '2',
        title: 'Código Real y Verificable',
        desc: 'Todo fragmento de código mostrado en la plataforma es compilado y probado previamente en las versiones estables vigentes de sus respectivos lenguajes y runtimes (.NET 8, Node.js 20+, Python 3.12, Go 1.22+, etc.).'
      },
      {
        num: '3',
        title: 'Ciclo Continuo de Actualización',
        desc: 'El mundo del software evoluciona rápidamente. Cuando se lanza una nueva versión estable (LTS o Major) con cambios estructurales de sintaxis (como Signals en Angular o Minimal APIs en .NET), revisamos nuestros artículos y fragmentos para reflejar la práctica contemporánea.'
      },
      {
        num: '4',
        title: 'Política Clara de Erratas',
        desc: 'Si cualquier miembro de la comunidad técnica detecta una inconsistencia, error en un fragmento o premisa imprecisa, la corrección se investiga y publica con transparencia junto a una nota de revisión en el propio artículo.'
      }
    ],
    errataTitle: '¿Encontraste algún punto a mejorar en un análisis técnico?',
    errataBodyBefore:
      'Fomentamos la revisión continua. Puedes enviar sugerencias de mejora o nuevas tecnologías para comparar directamente desde nuestra página de contacto o al correo'
  },
  contact: {
    badge: 'Canal Directo de Comunicación',
    title: 'Contáctanos & Envía Sugerencias',
    subtitle:
      '¿Tienes una duda técnica, sugerencia de comparativa entre frameworks o propuesta de colaboración editorial? Escribe directamente al autor.',
    directTitle: 'Contacto Directo',
    locationLabel: 'Ubicación:',
    locationValue: 'Brasil (Atención Remota Global)',
    responseLabel: 'Tiempo Medio de Respuesta:',
    responseValue: 'Entre 24 y 48 horas hábiles',
    devTipTitle: 'Consejo para Devs:',
    devTipBody:
      'Al sugerir una nueva comparativa, cuéntanos qué problema específico de negocio te gustaría ver implementado lado a lado.',
    successTitle: '¡Mensaje Enviado con Éxito!',
    successBody:
      'Gracias por ponerte en contacto. Tu mensaje ha sido recibido y nuestro equipo técnico responderá al correo indicado.',
    sendAnotherBtn: 'Enviar otro mensaje',
    nameLabel: 'Tu Nombre *',
    namePlaceholder: 'Ej: Carlos Silva',
    emailLabel: 'Tu Correo Electrónico *',
    emailPlaceholder: 'Ej: carlos@empresa.com',
    subjectLabel: 'Asunto Principal',
    subjects: [
      { value: 'sugestao', label: 'Sugerencia de Nueva Comparativa / Artículo' },
      { value: 'errata', label: 'Reportar Errata o Bug en Código' },
      { value: 'duvida', label: 'Duda sobre Arquitectura de Software' },
      { value: 'parceria', label: 'Colaboración Editorial o Institucional' }
    ],
    messageLabel: 'Tu Mensaje *',
    messagePlaceholder: 'Describe detalladamente tu consulta o sugerencia técnica...',
    errorDelivery:
      'No fue posible entregar el mensaje. Inténtalo nuevamente o utiliza el correo directo.',
    errorNetwork:
      'Error de conexión al enviar el mensaje. Verifica tu conexión o escribe directamente por correo.',
    sendingBtn: 'Enviando...',
    sendBtn: 'Enviar Mensaje'
  },
  terms: {
    badge: 'Términos de Uso & Condiciones Legales',
    title: 'Términos de Uso de la Plataforma CodeCompare',
    subtitle:
      'Última actualización: Septiembre de 2024. Al navegar y utilizar los recursos de CodeCompare, aceptas expresamente los términos descritos a continuación.',
    sections: [
      {
        title: '1. Licencia de los Fragmentos de Código (Code Snippets)',
        paragraphs: [
          'Todos los ejemplos prácticos de código fuente disponibles en las páginas comparativas de CodeCompare se ofrecen bajo una licencia abierta permisiva (estilo MIT).',
          'Tienes total libertad para estudiar, copiar, adaptar e incorporar estos fragmentos en tus propios proyectos de software, ya sean personales, educativos o comerciales, sin pago de regalías ni atribución obligatoria en tiempo de ejecución.'
        ]
      },
      {
        title: '2. Propiedad Intelectual de Artículos y Textos',
        paragraphs: [
          'A diferencia de los fragmentos de código, todos los textos de análisis crítico, benchmarks originales, tablas comparativas y el diseño general de CodeCompare son propiedad intelectual exclusiva del autor y del blog.',
          'Queda estrictamente prohibida la copia íntegra (scraping automatizado), republicación no autorizada o comercialización de nuestros artículos en otros sitios sin consentimiento previo por escrito.'
        ]
      },
      {
        title: '3. Limitación de Responsabilidad',
        paragraphs: [
          'Aunque todos los códigos y benchmarks se prueban exhaustivamente en entornos controlados, CodeCompare no se hace responsable de posibles inestabilidades, pérdida de datos, cuellos de botella o costos de infraestructura derivados de su aplicación directa en producción por terceros.',
          'Es responsabilidad exclusiva de cada ingeniero de software auditar, probar y validar adecuadamente las soluciones en el contexto específico de su arquitectura corporativa antes de desplegarlas en producción.'
        ]
      },
      {
        title: '4. Publicidad, Anuncios y Rastreo',
        paragraphs: [
          'CodeCompare utiliza servicios de publicidad programática proporcionados por Google AdSense para mantener la gratuidad de todo su contenido educativo.',
          'El uso de cookies para personalización de anuncios y el cumplimiento de la LGPD y el GDPR se detallan en nuestra Política de Privacidad.'
        ]
      }
    ]
  }
};

export default institutionalEs;
