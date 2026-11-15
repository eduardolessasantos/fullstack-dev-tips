import { CodeForFunLocale } from '../../types.ts';

const codeForFunPt: CodeForFunLocale = {
  ui: {
    kickerLeft: 'Laboratório Interativo',
    kickerRight: 'Código na Prática',
    title: 'Code for Fun',
    subtitle:
      'Digite, execute, quebre e descubra o porquê das coisas em JavaScript, TypeScript, Python e SQL — com humor dev e explicações direto ao ponto.',
    xpLabel: 'XP',
    levelPrefix: 'Nv.',
    streakLabel: 'Sequência',
    completedLabel: 'Concluídos',
    badgesBtn: 'Badges',
    badgesTitleAttr: 'Ver conquistas desbloqueadas',
    soundOnTitle: 'Efeitos sonoros ativados (clique para silenciar)',
    soundOffTitle: 'Efeitos sonoros desativados (clique para ativar)',
    soundMuteAria: 'Desativar efeitos sonoros',
    soundUnmuteAria: 'Ativar efeitos sonoros',
    nextLevelBefore: 'Próximo nível em',
    nextLevelAfter: 'XP',
    maxLevelReached: 'Nível máximo alcançado!',
    badgesPanelTitle: 'Conquistas do Laboratório',
    unlockedLabel: 'Desbloqueada',
    lockedLabel: 'Bloqueada',
    filterModeLabel: 'Modo',
    filterTrackLabel: 'Trilha',
    filterLangLabel: 'Linguagem',
    filterModeAria: 'Filtrar por modo',
    filterTrackAria: 'Filtrar por trilha',
    filterLangAria: 'Filtrar por linguagem',
    modeTabAll: 'Todos',
    trackFilterOptions: {
      all: 'Todas',
      warmup: 'Aquecimento',
      'hands-on': 'Mão na Massa',
      'senior-trap': 'Pegadinhas de Sênior'
    },
    langFilterOptions: {
      all: 'Todas',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      sql: 'SQL'
    },
    challengesCountSuffix: 'desafios',
    completedTag: 'Concluído',
    estimatedMinSuffix: 'min',
    minPrefix: '~',
    emptyFilterMsg: 'Nenhum desafio combina com estes filtros.',
    clearFiltersBtn: 'Limpar filtros',
    sqlTablesShow: 'Ver Tabelas',
    sqlTablesHide: 'Ocultar Tabelas',
    sqlTablesHeading: 'Tabelas disponíveis em memória:',
    sqlTablesColumnsLabel: 'Colunas:',
    editorShortcutHint: 'Ctrl+Enter / Cmd+Enter para executar',
    editorAriaLabel: 'Editor de código:',
    runBtnRunning: 'Executando...',
    runBtnIdle: 'Executar Código',
    stepModeBtn: 'Passo a Passo',
    hintBtnPrefix: 'Dica',
    resetBtn: 'Resetar',
    resetTitle: 'Restaurar código inicial',
    loadSolutionBtn: 'Ver Solução',
    loadSolutionTitle: 'Carregar solução comentada no editor',
    hintsHeader: 'Dicas Progressivas',
    canvasTitle: 'Palco Visual (Canvas API)',
    canvasInitialMsg: 'Clique em Executar para desenhar!',
    sqlResultTitle: 'Resultado da Consulta SQL',
    consoleTitle: 'Console / Saída',
    emptyOutputPrompt: 'Clique em "Executar Código" (ou pressione Ctrl+Enter) para ver o resultado ao vivo.',
    errorBannerTitle: 'Ops, algo deu errado na execução!',
    sqlEmptyRows: 'Consulta executada, mas retornou 0 linhas.',
    emptyLogsNotice: '(Execução concluída sem saídas de texto no console)',
    traceSqlTitle: 'Ordem Lógica de Execução SQL',
    traceMemTitle: 'Inspetor de Memória Viva',
    traceStepOf: 'Passo',
    tracePhasePrefix: 'Fase:',
    traceLinePrefix: 'Linha:',
    traceRestartTitle: 'Reiniciar trace',
    tracePrevTitle: 'Passo anterior',
    tracePlayTitle: 'Reproduzir automaticamente',
    tracePauseTitle: 'Pausar',
    traceNextTitle: 'Próximo passo',
    traceMemStateLabel: 'Estado das Variáveis na Memória',
    validationTitle: 'Validação Automática',
    ahaPrefix: 'Por que funciona?',
    celebrateTitle: 'Desafio Concluído!',
    celebrateBadgePrefix: 'Nova badge:',
    celebrateXpPrefix: '+{xp} XP',
    adLabel: 'Publicidade',
    syntaxCheckFailLabel: 'Execução sem erros de sintaxe',
    syntaxCheckFailDetail: 'Corrija o erro exibido acima para validar os testes.'
  },
  modeLabels: {
    challenge: 'Desafios Guiados',
    'bug-hunt': 'Caça aos Bugs',
    sandbox: 'Sandbox Livre'
  },
  trackLabels: {
    warmup: 'Aquecimento Divertido',
    'hands-on': 'Mão na Massa',
    'senior-trap': 'Pegadinhas de Sênior'
  },
  langLabels: {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python (Trace)',
    sql: 'SQL (Em Memória)'
  },
  levelTitles: [
    { maxXp: 100, level: 1, title: 'Estagiário Curioso', nextLevelXp: 100, currentFloorXp: 0 },
    { maxXp: 250, level: 2, title: 'Mestre do Console.log', nextLevelXp: 250, currentFloorXp: 100 },
    { maxXp: 450, level: 3, title: 'Domador de Bugs', nextLevelXp: 450, currentFloorXp: 250 },
    { maxXp: 700, level: 4, title: 'Arquiteto do Event Loop', nextLevelXp: 700, currentFloorXp: 450 },
    { maxXp: Number.POSITIVE_INFINITY, level: 5, title: 'Lenda do Deploy na Sexta', nextLevelXp: 1000, currentFloorXp: 700 }
  ],
  badges: [
    {
      id: 'first-spark',
      title: 'Primeiro Console.log',
      description: 'Completou seu primeiro desafio ou caça aos bugs no laboratório.',
      iconName: 'terminal'
    },
    {
      id: 'bug-hunter',
      title: 'Exterminador de Bugs',
      description: 'Resolveu 2 desafios do modo Caça aos Bugs.',
      iconName: 'bug'
    },
    {
      id: 'streak-3',
      title: 'Sequência Imparável',
      description: 'Acertou 3 desafios seguidos sem errar.',
      iconName: 'flame'
    },
    {
      id: 'polyglot',
      title: 'Poliglota Curioso',
      description: 'Completou desafios em pelo menos 2 linguagens diferentes.',
      iconName: 'sparkles'
    },
    {
      id: 'sql-master',
      title: 'Mestre dos Joins',
      description: 'Dominou uma consulta SQL no banco em memória.',
      iconName: 'database'
    },
    {
      id: 'senior-survivor',
      title: 'Sobrevivente das Pegadinhas',
      description: 'Superou um desafio da trilha Pegadinhas de Sênior.',
      iconName: 'trophy'
    }
  ],
  sqlTableDescriptions: {
    devs_e_cafes: 'Cadastro da equipe de engenharia e sua preferência diária de cafeína.',
    bugs_producao: 'Incidentes divertidos registrados na última sexta-feira às 17h55.',
    pedidos_pizza: 'Pedidos oficiais da squad durante a sprint review.'
  },
  items: {
    'cf-js-fizzbuzz-cafe': {
      title: 'FizzBuzz do Café da Manhã',
      funnyHook: 'Nada de Fizz e Buzz entediantes — aqui medimos produtividade em xícaras de café e deploys!',
      prompt:
        'Faça um loop de 1 até 15 e imprima com console.log: "Café no Deploy!" para múltiplos de 3 e 5, "Café" para múltiplos de 3, "Deploy" para múltiplos de 5, ou o próprio número nos demais casos.',
      starterCode: `// Missão: conte de 1 a 15 e imprima o ritmo do time!
for (let i = 1; i <= 15; i++) {
  // Dica: verifique primeiro se é múltiplo de 3 E 5 (i % 15 === 0)
  if (i % 3 === 0) {
    console.log("Café");
  } else {
    console.log(i);
  }
}`,
      solutionCode: `for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) {
    console.log("Café no Deploy!");
  } else if (i % 3 === 0) {
    console.log("Café");
  } else if (i % 5 === 0) {
    console.log("Deploy");
  } else {
    console.log(i);
  }
}`,
      hints: [
        'Use o operador de resto `%`: se `i % 5 === 0`, o número é divisível por 5.',
        'A ordem dos `if` importa! Se checar `i % 3 === 0` antes de `i % 15 === 0`, o 15 vai cair só no "Café".',
        'Estrutura completa: `if (i % 15 === 0) ... else if (i % 3 === 0) ... else if (i % 5 === 0) ... else ...`'
      ],
      ahaTitle: 'A ordem dos `if` muda tudo na lógica!',
      ahaExplanation: [
        'O número 15 é divisível por 3 e por 5 ao mesmo tempo. Quando colocamos a condição mais específica (`i % 15 === 0`) no topo, evitamos que a regra geral capture o caso especial antes da hora.',
        'Essa mesma ideia vale em rotas de API, middlewares e regras de desconto no checkout!'
      ],
      expectedStrings: {
        fizz: 'Café',
        buzz: 'Deploy',
        fizzbuzz: 'Café no Deploy!',
        empty: 'vazio'
      },
      checkLabels: [
        'Imprimiu exatamente 15 linhas (de 1 até 15)',
        'Múltiplos de 3, 5 e 15 corretos ("Café", "Deploy", "Café no Deploy!")'
      ],
      checkDetailsPass: ['15 linhas emitidas no console.', 'Sequência perfeita!'],
      checkDetailsFail: ['Foram emitidas {count} linhas.', '15º item saiu como "{val}".']
    },
    'cf-ts-tipagem-rpg': {
      title: 'Calculadora de Dano com TypeScript',
      funnyHook: 'Sua heroína Kira entrou na masmorra da produção, mas o cálculo de ataque crítico está somando errado.',
      prompt:
        'Complete a função tipada `calcularDano(heroi: Heroi, critico: boolean): number`. Se `critico` for true, retorne `(ataque + arma) * 2`; caso contrário, retorne `ataque + arma`. Depois imprima o resultado para Kira (esperado: 140).',
      starterCode: `interface Heroi {
  nome: string;
  ataque: number;
  arma: number;
}

function calcularDano(heroi: Heroi, critico: boolean): number {
  // Ajuste o cálculo abaixo!
  const base = heroi.ataque;
  return critico ? base * 2 : base;
}

const kira: Heroi = { nome: "Kira", ataque: 45, arma: 25 };
const dano = calcularDano(kira, true);
console.log("Dano de Kira:", dano);`,
      solutionCode: `interface Heroi {
  nome: string;
  ataque: number;
  arma: number;
}

function calcularDano(heroi: Heroi, critico: boolean): number {
  const base = heroi.ataque + heroi.arma;
  return critico ? base * 2 : base;
}

const kira: Heroi = { nome: "Kira", ataque: 45, arma: 25 };
const dano = calcularDano(kira, true);
console.log("Dano de Kira:", dano);`,
      hints: [
        'Repare que `heroi.arma` ficou de fora da variável `base`!',
        'Some `heroi.ataque + heroi.arma` antes de multiplicar por 2 quando `critico` for true.',
        'Com `ataque: 45` e `arma: 25`, a base dá `70`, e o crítico dobra para `140`.'
      ],
      ahaTitle: 'Interfaces deixam contratos óbvios até sem rodar!',
      ahaExplanation: [
        'A interface `Heroi` documenta na hora quais campos existem (`nome`, `ataque`, `arma`), evitando que você esqueça atributos ou tente acessar `heroi.forca` por engano.',
        'No browser, o TypeScript é removido (transpilado) antes de executar — por isso aqui no laboratório removemos as anotações de tipo e rodamos o JavaScript resultante em milissegundos.'
      ],
      expectedStrings: { empty: 'vazia' },
      checkLabels: [
        'Incluiu o bônus da arma no cálculo crítico (140)',
        'Manteve o log informativo da heroína Kira'
      ],
      checkDetailsPass: ['Dano crítico calculado em 140!', 'Nome exibido corretamente.'],
      checkDetailsFail: ['Saída atual: "{output}"', 'Mantenha o console.log com "Kira".']
    },
    'cf-py-ranking-memes': {
      title: 'Filtro de Cafeína em Python (Com Trace)',
      funnyHook: 'O RH quer saber quantas xícaras EXTRAS (acima de 2 por pessoa) foram consumidas na sprint.',
      prompt:
        'Complete o laço `for` em Python para somar apenas o excedente acima de 2 xícaras de cada item da lista `xicaras`, e ao final imprima `Total extra: 6`. Use o botão "Passo a Passo" para ver cada variável mudar!',
      starterCode: `xicaras = [1, 4, 2, 5, 3]
extra = 0

for q in xicaras:
    # Se q for maior que 2, some (q - 2) em extra!
    if q > 10:
        extra += q - 2

print(f"Total extra: {extra}")`,
      solutionCode: `xicaras = [1, 4, 2, 5, 3]
extra = 0

for q in xicaras:
    if q > 2:
        extra += q - 2

print(f"Total extra: {extra}")`,
      hints: [
        'A condição `if q > 10:` nunca é verdadeira porque ninguém tomou mais de 10 cafés.',
        'Troque `if q > 10:` para `if q > 2:`.',
        'Contando: 4-2 = 2, 5-2 = 3, 3-2 = 1 → total `2 + 3 + 1 = 6`!'
      ],
      ahaTitle: 'Visualizar a memória linha por linha elimina bugs invisíveis!',
      ahaExplanation: [
        'Quando você clica em "Passo a Passo", vê exatamente o valor de `q` e `extra` a cada iteração do loop — percebendo na hora por que `if q > 10:` nunca entrava no bloco.',
        'No Python real, f-strings como `f"Total extra: {extra}"` deixam a formatação super legível sem precisar concatenar strings com `+ str(extra)`.'
      ],
      expectedStrings: { totalLine: 'Total extra: 6', empty: 'nada' },
      checkLabels: ['Calculou e imprimiu "Total extra: 6"'],
      checkDetailsPass: ['Soma exata: (4-2) + (5-2) + (3-2) = 6!'],
      checkDetailsFail: ['Imprimiu: "{output}"']
    },
    'cf-sql-pizzaria-top': {
      title: 'O Ranking da Sexta-Feira na Pizzaria',
      funnyHook: 'Hora de fechar a conta da sprint! Precisamos listar os pedidos em grupo (2 ou mais pizzas), do mais caro para o mais barato.',
      prompt:
        'Escreva uma consulta na tabela `pedidos_pizza` selecionando `cliente, sabor, valor_total` onde `quantidade >= 2`, ordenando pelo maior `valor_total` (`DESC`).',
      starterCode: `-- Dica: confira a estrutura da tabela clicando em "Ver Tabelas"
SELECT cliente, sabor, valor_total
FROM pedidos_pizza
WHERE quantidade >= 5
ORDER BY valor_total ASC;`,
      solutionCode: `SELECT cliente, sabor, valor_total
FROM pedidos_pizza
WHERE quantidade >= 2
ORDER BY valor_total DESC;`,
      hints: [
        'O filtro atual `quantidade >= 5` não retorna ninguém porque o máximo pedido foi 3 pizzas.',
        'Mude o filtro para `WHERE quantidade >= 2`.',
        'Para mostrar o mais caro no topo, troque `ASC` por `DESC` no `ORDER BY valor_total`.'
      ],
      ahaTitle: 'O SQL executa o WHERE muito antes do ORDER BY!',
      ahaExplanation: [
        'Veja no painel de Trace Lógico: primeiro o banco lê a tabela (`FROM`), depois descarta quem pediu apenas 1 pizza (`WHERE`), projeta as 3 colunas (`SELECT`) e só por último ordena (`ORDER BY`).',
        'Como o `WHERE` filtra antes da ordenação, quanto melhor seu filtro (e seus índices), menos linhas o banco precisa ordenar!'
      ],
      expectedStrings: { empty: 'nenhuma' },
      checkLabels: [
        'Retornou as colunas cliente, sabor e valor_total',
        'Filtrou pedidos com quantidade >= 2 (3 pedidos) ordenados por maior valor'
      ],
      checkDetailsPass: ['Colunas corretas.', 'Carla (186), Diego (128) e Ana (118) no pódio!'],
      checkDetailsFail: [
        'Colunas retornadas: {cols}',
        'Foram retornadas {count} linha(s); esperado: Carla, Diego, Ana.'
      ]
    },
    'cf-bug-js-soma-string': {
      title: 'O Mistério do "100" + "20" = "10020"',
      funnyHook: 'Um cliente comprou um teclado de R$ 100 com R$ 20 de frete... e o sistema cobrou R$ 10.020!',
      prompt:
        'O `<input>` do formulário enviou `"20"` como string! Corrija a função `somarCarrinho(preco, frete)` para converter os valores para número e retornar `120` (como number).',
      starterCode: `function somarCarrinho(preco, frete) {
  // BUG: em JS, número + string vira concatenação de texto!
  return preco + frete;
}

const total = somarCarrinho(100, "20");
console.log("Total:", total, "| Tipo:", typeof total);
return total;`,
      solutionCode: `function somarCarrinho(preco, frete) {
  return Number(preco) + Number(frete);
}

const total = somarCarrinho(100, "20");
console.log("Total:", total, "| Tipo:", typeof total);
return total;`,
      hints: [
        'Em JavaScript, o operador `+` serve tanto para somar números quanto para juntar textos.',
        'Converta ambos os parâmetros usando `Number(preco) + Number(frete)`.',
        'Se tudo der certo, o log vai mostrar `Total: 120 | Tipo: number`.'
      ],
      ahaTitle: 'Coerção implícita é a pegadinha clássica do JavaScript!',
      ahaExplanation: [
        'Sempre que um dos lados do `+` é uma string (`"20"`), o JavaScript transforma o outro lado em string também e junta os dois: `"100" + "20" = "10020"`.',
        'Já com `Number(...)` explícito (ou validação com Zod/TypeScript na entrada da API), você nunca passa esse susto no checkout!'
      ],
      checkLabels: ['Retornou o valor numérico 120 (em vez de "10020")'],
      checkDetailsPass: ['Bug esmagado! Valor 120 como number.'],
      checkDetailsFail: ['Resultado atual: {ret} ({log})']
    },
    'cf-bug-py-lista-fantasma': {
      title: 'A Mochila Compartilhada em Python',
      funnyHook: 'Ana colocou um notebook na mochila dela, mas o Bruno abriu a dele e encontrou o notebook da Ana lá dentro!',
      prompt:
        'Execute o código para ver o bug ao vivo: `mochila=[]` como argumento padrão faz todas as chamadas compartilharem A MESMA lista na memória! Corrija usando `mochila=None` e criando `[]` dentro da função.',
      starterCode: `def adicionar_item(item, mochila=[]):
    mochila.append(item)
    return mochila

ana = adicionar_item("Notebook")
bruno = adicionar_item("Fone")

print("Ana:", ana)
print("Bruno:", bruno)`,
      solutionCode: `def adicionar_item(item, mochila=None):
    if mochila is None:
        mochila = []
    mochila.append(item)
    return mochila

ana = adicionar_item("Notebook")
bruno = adicionar_item("Fone")

print("Ana:", ana)
print("Bruno:", bruno)`,
      hints: [
        'Em Python, valores padrão de função (`mochila=[]`) são criados UMA única vez quando o `def` é lido, não a cada chamada!',
        'Troque a assinatura para `def adicionar_item(item, mochila=None):`.',
        'Dentro da função, adicione:\n`if mochila is None:\n    mochila = []`'
      ],
      ahaTitle: 'Default arguments em Python são avaliados no `def`, não no call!',
      ahaExplanation: [
        'Essa é uma das perguntas mais famosas em entrevistas sênior de Python! Como listas (`[]`) e dicionários (`{}`) são mutáveis, usá-los como valor padrão cria um estado global escondido entre chamadas.',
        'A convenção pythônica oficial é sempre usar `None` como padrão e instanciar uma nova lista dentro do corpo da função.'
      ],
      expectedStrings: {
        anaLine: "Ana: ['Notebook']",
        brunoLine: "Bruno: ['Fone']",
        empty: 'vazia'
      },
      checkLabels: [
        "Ana ficou apenas com ['Notebook']",
        "Bruno ficou apenas com ['Fone']"
      ],
      checkDetailsPass: ['Mochila da Ana isolada.', 'Mochila do Bruno isolada!'],
      checkDetailsFail: ['Saída da Ana: {out}', 'Saída do Bruno: {out}']
    },
    'cf-bug-js-event-loop': {
      title: 'Corrida Maluca no Event Loop',
      funnyHook: 'Alguém tentou imprimir 1, 2, 3, 4 usando setTimeout e Promise... e a fila saiu toda embaralhada!',
      prompt:
        'Rode o código como está e observe a ordem real do Event Loop (`1`, `4`, `3`, `2`). Depois, corrija usando `async/await` para que o console imprima exatamente `1`, `2`, `3`, `4` em sequência!',
      starterCode: `// Rode uma vez para ver a ordem real: 1 -> 4 -> 3 -> 2!
// Depois, use await / Promises para imprimir 1, 2, 3, 4 na ordem certa.
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);`,
      solutionCode: `console.log(1);

await new Promise(resolve => {
  setTimeout(() => {
    console.log(2);
    resolve();
  }, 0);
});

await Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);`,
      hints: [
        'Código síncrono (`1` e `4`) sempre roda antes de qualquer callback assíncrono.',
        '`Promise.then` vai para a fila de Microtasks (prioridade alta), enquanto `setTimeout` vai para a fila de Macrotasks (prioridade menor).',
        'Você pode envolver o `setTimeout` em `await new Promise(r => setTimeout(() => { console.log(2); r(); }, 0))` e usar `await` antes da Promise do `3`!'
      ],
      ahaTitle: 'Call Stack → Microtasks (Promises) → Macrotasks (setTimeout)',
      ahaExplanation: [
        'Mesmo com `0ms`, um `setTimeout` nunca fura a fila de uma `Promise` já resolvida. O Event Loop só puxa a próxima Macrotask quando a Call Stack e toda a fila de Microtasks estão vazias.',
        'Entender essa hierarquia evita bugs cabeludos de race condition em React, Node.js e animações de interface!'
      ],
      checkLabels: ['Imprimiu exatamente 1, 2, 3, 4 em ordem'],
      checkDetailsPass: ['Event Loop domesticado com sucesso!'],
      checkDetailsFail: ['Ordem atual: [{order}]']
    },
    'cf-bug-sql-null-trap': {
      title: 'O Sumiço do Estagiário (Armadilha do NULL)',
      funnyHook: 'Diego não toma café (`tipo_cafe` é NULL) e a consulta atual simplesmente apagou o coitado do relatório!',
      prompt:
        'Em SQL, `tipo_cafe != \'Descafeinado\'` retorna UNKNOWN para valores `NULL`! Corrija a consulta em `devs_e_cafes` para retornar TODOS os 4 devs que NÃO tomam descafeinado (incluindo o Diego com NULL).',
      starterCode: `-- BUG: Diego tem tipo_cafe = NULL e está sumindo do resultado!
SELECT nome, nivel, tipo_cafe
FROM devs_e_cafes
WHERE tipo_cafe != 'Descafeinado';`,
      solutionCode: `SELECT nome, nivel, tipo_cafe
FROM devs_e_cafes
WHERE tipo_cafe != 'Descafeinado' OR tipo_cafe IS NULL;`,
      hints: [
        'No SQL, `NULL` não significa texto vazio — significa "desconhecido". Qualquer comparação `NULL != "algo"` dá falso/desconhecido!',
        'Para incluir registros nulos explicitamente, use `IS NULL` (nunca `= NULL`).',
        'Adicione `OR tipo_cafe IS NULL` na sua cláusula `WHERE`!'
      ],
      ahaTitle: 'Em SQL, `NULL = NULL` não é verdadeiro — é UNKNOWN!',
      ahaExplanation: [
        'A lógica booleana do SQL tem três valores: `TRUE`, `FALSE` e `UNKNOWN`. Como o `WHERE` só mantém linhas onde a expressão é `TRUE`, qualquer linha com `NULL` acaba sendo descartada silenciosamente!',
        'Por isso `IS NULL` e `IS NOT NULL` existem. Esse detalhe salva relatórios financeiros e filtros de cadastro todos os dias.'
      ],
      checkLabels: [
        'Resgatou Diego (tipo_cafe NULL) no resultado',
        'Manteve os 4 devs que não tomam Descafeinado (excluiu Elena)'
      ],
      checkDetailsPass: ['Diego apareceu!', 'Ana, Bruno, Carla e Diego listados!'],
      checkDetailsFail: [
        'Diego continua sumido por causa do NULL.',
        'Retornou {count} linha(s): {names}'
      ]
    },
    'cf-sandbox-js-canvas': {
      title: 'Arte Generativa no Canvas com JS',
      funnyHook: 'Use a API `draw` para desenhar constelações, espirais ou gráficos direto no palco visual!',
      prompt:
        'Brinque livremente com `draw.clear()`, `draw.circle(x, y, r, cor)`, `draw.rect(x, y, w, h, cor)`, `draw.line(x1, y1, x2, y2, cor)` e `draw.text(txt, x, y, cor)`. Mude o código e veja o desenho ganhar vida!',
      starterCode: `// Palco Canvas 360x220 — mude os números, cores e laços!
draw.clear("#090d16");

const cores = ["#22d3ee", "#38bdf8", "#818cf8", "#c084fc", "#34d399"];

for (let i = 0; i < 18; i++) {
  const angulo = i * 0.45;
  const raio = 12 + i * 4.5;
  const x = 180 + Math.cos(angulo) * raio;
  const y = 110 + Math.sin(angulo) * (raio * 0.72);
  const cor = cores[i % cores.length];

  draw.line(180, 110, x, y, "rgba(148, 163, 184, 0.25)", 1);
  draw.circle(x, y, 4 + (i % 5), cor);
}

draw.text("Code for Fun ✨", 122, 204, "#e2e8f0", 13);
console.log("Espiral gerada com 18 nós!");`,
      solutionCode: `draw.clear("#090d16");
draw.circle(180, 110, 48, "#22d3ee");
draw.text("Arte pronta!", 142, 115, "#020617", 14);`,
      hints: [
        'A área do palco visual tem 360px de largura por 220px de altura.',
        'Experimente trocar `Math.cos(angulo)` por `Math.cos(angulo * 2)` para criar pétalas geométricas!'
      ],
      ahaTitle: 'Matemática + Loops = Arte Visual Instantânea!',
      ahaExplanation: [
        'Seno e cosseno transformam um simples contador `i` em órbitas, espirais e ondas suaves.',
        'Experimente alterar o multiplicador do ângulo ou o tamanho do raio para ver padrões completamente novos emergirem em tempo real.'
      ]
    },
    'cf-sandbox-py-trace': {
      title: 'Laboratório Python: Memória Viva',
      funnyHook: 'Escreva loops, list comprehensions e funções e acompanhe cada variável mudando no inspetor!',
      prompt:
        'Sandbox livre de Python com simulador passo a passo. Teste funções, dicionários, loops e list comprehensions e clique em "Passo a Passo" para inspecionar a memória linha por linha.',
      starterCode: `# Teste list comprehensions, dicionários e loops ao vivo!
squad = ["Ana", "Bruno", "Carla"]
pontos = {"Ana": 120, "Bruno": 95, "Carla": 150}

dobro = [pontos[nome] * 2 for nome in squad]
print("Dobro dos pontos:", dobro)

campeao = ""
maior = 0
for dev in squad:
    if pontos[dev] > maior:
        maior = pontos[dev]
        campeao = dev

print(f"Líder da sprint: {campeao} com {maior} pts!")`,
      solutionCode: `print("Use este espaço para experimentar Python!")`,
      hints: [
        'Você pode criar funções com `def`, usar `range(1, 10)`, `sum(...)`, `len(...)` e `sorted(...)`.',
        'Clique em "Passo a Passo" para avançar ou retroceder a execução linha a linha.'
      ],
      ahaTitle: 'List Comprehensions condensam loops sem perder legibilidade',
      ahaExplanation: [
        'A expressão `[pontos[nome] * 2 for nome in squad]` cria uma lista transformada em uma única linha expressiva — um dos recursos mais amados do Python.'
      ]
    },
    'cf-sandbox-sql-lab': {
      title: 'SQL Playground: Devs, Cafés & Bugs',
      funnyHook: 'Cruze a tabela de desenvolvedores com a de bugs da sexta-feira usando JOIN, GROUP BY e COUNT!',
      prompt:
        'Consulte livremente as tabelas `devs_e_cafes`, `bugs_producao` e `pedidos_pizza`. Experimente `INNER JOIN`, `LEFT JOIN`, `COUNT(*)`, `SUM(...)`, `GROUP BY` e `ORDER BY`.',
      starterCode: `-- Quem resolveu mais bugs de produção?
SELECT d.nome, d.nivel, COUNT(b.id) AS total_bugs
FROM devs_e_cafes d
LEFT JOIN bugs_producao b ON d.id = b.dev_id
GROUP BY d.nome, d.nivel
ORDER BY total_bugs DESC;`,
      solutionCode: `SELECT d.nome, d.nivel, COUNT(b.id) AS total_bugs
FROM devs_e_cafes d
LEFT JOIN bugs_producao b ON d.id = b.dev_id
GROUP BY d.nome, d.nivel
ORDER BY total_bugs DESC;`,
      hints: [
        'Troque `LEFT JOIN` por `INNER JOIN` para notar quem desaparece quando tem 0 bugs.',
        'Clique em "Ver Tabelas" para consultar todas as colunas disponíveis nas 3 tabelas.'
      ],
      ahaTitle: 'COUNT(coluna) ignora NULLs — e isso é um superpoder!',
      ahaExplanation: [
        'Quando usamos `LEFT JOIN`, devs sem bugs ficam com `b.id = NULL`. Como `COUNT(b.id)` ignora valores `NULL`, ele devolve `0` perfeitamente — enquanto `COUNT(*)` contaria a linha como `1`!'
      ]
    }
  },
  engineMessages: {
    timeoutError: 'Opa! Seu código demorou demais (mais de 1.5s). Será que rolou um loop infinito por aí?',
    timeoutRaw: 'Timeout: Loop infinito detectado (> 1500ms)',
    isNotDefinedError: name =>
      `Ops! "${name}" ainda não foi declarado antes de ser usado. Confira a ortografia ou declare com let/const.`,
    isNotFunctionError:
      'Você tentou chamar algo como função `()`, mas esse valor não é uma função (pode ser undefined, número ou objeto).',
    nullPropertyError:
      'Tentativa de acessar propriedade em um valor nulo ou undefined. Que tal checar com `?.` (optional chaining) ou validar antes?',
    constAssignError:
      'Você tentou reatribuir um valor a uma variável `const`. Se ela precisa mudar, troque para `let`!',
    syntaxError: raw => `Erro de sintaxe: faltou fechar algum parêntese, chave ou aspas? (${raw})`,
    runtimeError: raw => `Aconteceu um erro durante a execução: ${raw}`,
    noWorkerError: 'Seu navegador atual não suporta Web Workers isolados para execução.',
    unknownError: 'Erro desconhecido',
    anonFnLabel: 'anônima',
    defaultVarLabel: 'uma variável',
    python: {
      maxStepsError: 'Limite de 220 passos atingido no simulador Python (evitando loop infinito).',
      nameError: name => `NameError: nome '${name}' não foi definido`,
      nonIterableComprehension: 'Objeto não iterável na list comprehension',
      missingArgError: (fnName, argName) => `TypeError: ${fnName}() argumento obrigatório '${argName}' ausente`,
      unknownExprError: expr => `Expressão Python não reconhecida: "${expr}"`,
      syntaxErrorLine: (line, raw) => `SyntaxError na linha ${line}: ${raw}`,
      forNonIterableError: line => `Objeto não iterável na linha ${line}`,
      defNote: (fnName, hasDefaults) =>
        `Definiu a função "${fnName}"${hasDefaults ? ' (atenção: os valores padrão foram avaliados agora na definição!)' : ''}.`,
      returnNote: val => `Retornou ${val} da função.`,
      elseNote: 'Entrou no bloco else.',
      condEvalNote: (cond, ok) => `Avaliou "${cond}" → ${ok ? 'True (entra no bloco)' : 'False (pula)'}.`,
      forIterNote: (target, val) => `Iteração do loop: ${target} = ${val}`,
      whileTrueNote: cond => `Condição "${cond}" é True — executando laço.`,
      whileDoneNote: cond => `Condição "${cond}" ficou False — saiu do while.`,
      augAssignNote: (varName, val) => `Atualizou "${varName}" para ${val}.`,
      indexAssignNote: (val, lhs) => `Atribuiu ${val} em ${lhs}.`,
      unpackNote: lhs => `Desempacotou valores em ${lhs}.`,
      assignNote: (lhs, val) => `Guardou ${lhs} = ${val}.`,
      printNote: text => `Imprimiu no console: "${text}"`,
      exprNote: (raw, val) => `Executou "${raw}"${val !== null ? ` → ${val}` : ''}.`,
      errorFriendlyPrefix: raw => `Erro no simulador Python: ${raw}`
    },
    sql: {
      emptyQueryError: 'Digite uma consulta SELECT para executar no banco em memória!',
      onlySelectError:
        'Neste laboratório interativo, use consultas SELECT (com FROM, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT).',
      invalidFromError: clause => `Cláusula FROM inválida: "${clause}"`,
      tableNotFoundError: (name, available) => `Tabela "${name}" não encontrada. Disponíveis: ${available}`,
      invalidJoinError: clause => `Sintaxe de JOIN inválida: "${clause}"`,
      joinTableNotFoundError: name => `Tabela de JOIN "${name}" não encontrada.`,
      colNotFoundJoinError: col => `Coluna "${col}" não existe nas tabelas selecionadas.`,
      colNotFoundSelectError: col => `Coluna "${col}" não encontrada.`,
      invalidWhereError: cond => `Condição WHERE não compreendida: "${cond}"`,
      fromPhase: '1. FROM',
      leftJoinPhase: '2. LEFT JOIN',
      innerJoinPhase: '2. INNER JOIN',
      wherePhase: '3. WHERE',
      groupPhase: '4. GROUP BY',
      selectPhase: '5. SELECT',
      orderPhase: '6. ORDER BY',
      limitPhase: '7. LIMIT',
      varTable: 'tabela',
      varRows: 'linhas',
      varFilter: 'filtro',
      varBefore: 'antes',
      varAfter: 'depois',
      varGroups: 'grupos',
      varColumns: 'colunas',
      varOrder: 'ordenação',
      varLimit: 'limite',
      fromStepNote: (rowsCount, tableName) => `Carregou ${rowsCount} linha(s) da tabela "${tableName}".`,
      joinStepNote: (isLeft, rowsCount) =>
        `${isLeft ? 'LEFT JOIN preservou todas da esquerda' : 'INNER JOIN cruzou correspondências'} → ${rowsCount} linha(s).`,
      whereStepNote: (clause, after, before) => `Filtrou com WHERE (${clause}): restaram ${after} de ${before} linha(s).`,
      groupStepNote: (groupsCount, clause) => `Agrupou as linhas em ${groupsCount} grupo(s) distintos por ${clause}.`,
      selectStepNote: (cols, rowsCount) => `Projetou as colunas [${cols}] com ${rowsCount} linha(s).`,
      orderStepNote: clause => `Ordenou o resultado por ${clause}.`,
      limitStepNote: limit => `Limitou a exibição às primeiras ${limit} linha(s).`,
      successInfoLog: rowsCount => `Consulta executada com sucesso: ${rowsCount} linha(s) retornada(s).`
    }
  }
};

export default codeForFunPt;
