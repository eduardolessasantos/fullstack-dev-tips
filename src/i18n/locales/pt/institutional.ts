import { InstitutionalLocale } from '../../types.ts';

const institutionalPt: InstitutionalLocale = {
  about: {
    badge: 'E-E-A-T • Transparência e Rigor Editorial',
    title: 'Sobre o CodeCompare & Eduardo Lessa',
    subtitle:
      'Uma plataforma de engenharia de software desenhada para transformar a aprendizagem técnica em um exercício de contraste, raciocínio crítico e medição pragmática.',
    founderBadge: 'Engenheiro Fundador & Autor',
    role: 'Engenheiro de Software Full-Stack & Especialista em Arquitetura Distribuída',
    locationLine: 'devedulessa.com.br • eduardolessa2011@gmail.com • Rio de Janeiro, Brasil',
    paragraphs: [
      'Com mais de uma década de vivência no desenvolvimento de sistemas de alta criticidade, atuei na concepção de microsserviços resilientes, arquiteturas orientadas a eventos (EDA), pipelines de dados com alta taxa de transferência e interfaces web modernas para os setores de finanças, e-commerce e logística.',
      'Ao longo de anos liderando times técnicos e treinando dezenas de desenvolvedores, notei um vício comum no ecossistema de tecnologia: o aprendizado por repetição mecânica ou decoreba de tutoriais superficiais de "To-Do List". Desenvolvedores aprendem a copiar código sem entender o porquê das decisões arquiteturais tomadas por baixo do capô.',
      'O CodeCompare nasceu como uma resposta deliberada a essa lacuna: criar um repositório técnico vivo onde a mesma solução de engenharia é dissecada lado a lado nas principais linguagens, frameworks e bancos de dados contemporâneos.'
    ],
    contactBtn: 'Falar com o Autor',
    methodTitle: 'Nossa Metodologia de Benchmarks & Verificação',
    methodSubtitle:
      'Nenhum dado publicado no CodeCompare é produto de especulação ou opiniões vazias de redes sociais. Nossas comparações obedecem a critérios estritos de engenharia:',
    cards: [
      {
        step: '01. Ambiente Isolado',
        title: 'Containers Dedicados',
        desc: 'Todos os testes de carga e consumo de memória são executados em instâncias Linux isoladas no Docker, limitando vCPU e RAM para simular produção real.'
      },
      {
        step: '02. Métricas Reais',
        title: 'Percentis p95 e p99',
        desc: 'Não medimos apenas médias simples de latência. Avaliamos a cauda estatística de chamadas com ferramentas padrão de mercado como k6 e Apache Bench.'
      },
      {
        step: '03. Código Canônico',
        title: 'Idiomático em Cada Stack',
        desc: 'Não forçamos paradigmas de C# dentro do Go ou de React dentro do Angular. Cada snippet segue rigorosamente as recomendações oficiais da comunidade de cada linguagem.'
      }
    ],
    commitmentTitle: 'Compromisso com Conteúdo Autoral e Original',
    commitmentBody:
      'O CodeCompare repudia ativamente a geração indiscriminada de artigos vazios por ferramentas automáticas de scraping. Todo o material, arquitetura de tabelas, análises de trade-offs e diagramas conceituais são redigidos, revisados e mantidos manualmente para fornecer valor concreto e prático à carreira de engenheiros de software.'
  },
  editorial: {
    badge: 'Ética & Governança Editorial',
    title: 'Diretrizes Editoriais do CodeCompare',
    subtitle:
      'Nossa declaração formal de transparência, independência técnica, metodologia de revisão por pares e critérios de correção de erratas.',
    principles: [
      {
        num: '1',
        title: 'Independência Editorial',
        desc: 'O CodeCompare não aceita pagamentos, patrocínios ocultos ou favorecimentos comerciais para promover ou desfavorecer qualquer framework, nuvem ou empresa de software. Nossas comparações são estritamente agnósticas e orientadas a métricas de engenharia.'
      },
      {
        num: '2',
        title: 'Código Real e Testável',
        desc: 'Todo trecho de código exibido na plataforma é previamente compilado e testado nas versões estáveis vigentes das respectivas linguagens e runtimes (.NET 8, Node.js 20+, Python 3.12, Go 1.22+, etc.).'
      },
      {
        num: '3',
        title: 'Ciclo Contínuo de Atualizações',
        desc: 'O mundo do software evolui em ritmo acelerado. Quando uma nova versão estável (LTS ou Major) de um framework é lançada com mudanças estruturais de sintaxe (como a introdução de Signals no Angular ou Minimal APIs no .NET), revisamos nossos artigos e snippets para refletir a prática contemporânea.'
      },
      {
        num: '4',
        title: 'Política Clara de Erratas',
        desc: 'Se qualquer membro da comunidade de desenvolvedores identificar uma inconsistência técnica, bug em snippet ou premissa imprecisa, a correção é investigada e publicada com transparência, acompanhada de nota de revisão no próprio artigo.'
      }
    ],
    errataTitle: 'Encontrou um ponto a melhorar em uma análise técnica?',
    errataBodyBefore:
      'Incentivamos a revisão contínua. Você pode enviar sugestões de melhoria ou novas tecnologias para compararmos diretamente pela nossa página de contato ou pelo e-mail'
  },
  contact: {
    badge: 'Canal Direto de Comunicação',
    title: 'Fale Conosco & Envie Sugestões',
    subtitle:
      'Tem uma dúvida técnica, sugestão de comparativo de framework ou proposta de parceria editorial? Entre em contato diretamente com o autor.',
    directTitle: 'Contato Direto',
    locationLabel: 'Localização:',
    locationValue: 'Brasil (Atendimento Remoto Global)',
    responseLabel: 'Tempo Médio de Resposta:',
    responseValue: 'Em até 24 a 48 horas úteis',
    devTipTitle: 'Dica para Devs:',
    devTipBody:
      'Ao sugerir um novo comparativo, informe qual problema de negócio específico você gostaria de ver implementado lado a lado.',
    successTitle: 'Mensagem Enviada com Sucesso!',
    successBody:
      'Obrigado pelo seu contato. Sua mensagem foi recebida e nossa equipe técnica responderá no e-mail informado.',
    sendAnotherBtn: 'Enviar outra mensagem',
    nameLabel: 'Seu Nome *',
    namePlaceholder: 'Ex: Carlos Silva',
    emailLabel: 'Seu E-mail *',
    emailPlaceholder: 'Ex: carlos@empresa.com',
    subjectLabel: 'Assunto Principal',
    subjects: [
      { value: 'sugestao', label: 'Sugestão de Novo Comparativo / Artigo' },
      { value: 'errata', label: 'Reportar Errata ou Bug em Código' },
      { value: 'duvida', label: 'Dúvida sobre Arquitetura' },
      { value: 'parceria', label: 'Parceria Editorial ou Institucional' }
    ],
    messageLabel: 'Sua Mensagem *',
    messagePlaceholder: 'Escreva detalhadamente sua dúvida ou sugestão técnica...',
    errorDelivery:
      'Não foi possível entregar a mensagem. Tente novamente ou use o e-mail direto.',
    errorNetwork:
      'Erro de conexão ao enviar mensagem. Verifique sua internet ou contate diretamente por e-mail.',
    sendingBtn: 'Enviando...',
    sendBtn: 'Enviar Mensagem'
  },
  terms: {
    badge: 'Termos de Uso & Condições Legais',
    title: 'Termos de Uso da Plataforma CodeCompare',
    subtitle:
      'Última atualização: Setembro de 2024. Ao navegar e utilizar os recursos do CodeCompare, você concorda expressamente com os termos descritos abaixo.',
    sections: [
      {
        title: '1. Licença dos Trechos de Código (Code Snippets)',
        paragraphs: [
          'Todos os exemplos práticos de código-fonte disponibilizados nas páginas comparativas do CodeCompare são fornecidos sob licença aberta permissiva (estilo MIT).',
          'Você tem total liberdade para estudar, copiar, adaptar e incorporar esses trechos em seus próprios projetos de software, sejam eles pessoais, educacionais ou comerciais, sem necessidade de pagamento de royalties ou atribuição formal em tempo de execução.'
        ]
      },
      {
        title: '2. Propriedade Intelectual dos Artigos e Textos',
        paragraphs: [
          'Diferente dos trechos de código, todos os textos de análise crítica, benchmarks autorais, diagramas comparativos e o design geral do CodeCompare são de propriedade intelectual exclusiva do autor e do blog.',
          'É expressamente vedada a cópia integral (scraping automatizado), republicação não autorizada ou comercialização de nossos artigos em outros sites sem consentimento prévio e expresso por escrito.'
        ]
      },
      {
        title: '3. Limitação de Responsabilidade',
        paragraphs: [
          'Embora todos os códigos e benchmarks sejam testados exaustivamente em ambientes de teste controlados, o CodeCompare não se responsabiliza por eventuais instabilidades, perdas de dados, gargalos de performance ou custos de infraestrutura decorrentes da aplicação direta de tais códigos em ambientes de produção de terceiros.',
          'É de inteira responsabilidade do engenheiro de software avaliar, auditar e testar adequadamente as soluções no contexto específico da sua arquitetura corporativa antes de promover alterações em ambientes produtivos.'
        ]
      },
      {
        title: '4. Publicidade, Anúncios e Rastreamento',
        paragraphs: [
          'O CodeCompare utiliza serviços de publicidade programática fornecidos pelo Google AdSense para manter a gratuidade de todo o seu conteúdo educacional.',
          'O uso de cookies para personalização de anúncios e respeito às diretrizes da Lei Geral de Proteção de Dados (LGPD) e GDPR estão detalhados em nossa Política de Privacidade.'
        ]
      }
    ]
  }
};

export default institutionalPt;
