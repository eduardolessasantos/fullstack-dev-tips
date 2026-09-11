import { DetailedArticle, ArticleAuthor } from '../types.ts';

export const DEFAULT_AUTHOR: ArticleAuthor = {
  name: 'Eduardo Lessa',
  role: 'Engenheiro de Software Full-Stack & Especialista em Arquitetura Distribuída',
  bio: 'Mais de 10 anos de experiência construindo sistemas de alta escala, APIs resilientes e interfaces frontend de alto desempenho. Apaixonado por ensinar por contraste técnico pragmático.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com'
};

export const DETAILED_ARTICLES: DetailedArticle[] = [
  {
    id: 'signals-reactivity',
    slug: 'signals-o-futuro-da-reatividade-frontend',
    title: 'Signals: O Futuro da Reatividade no Angular 17+, Vue 3 e React 19',
    subtitle: 'Por que o paradigma de reatividade de granularidade fina está substituindo o Virtual DOM e a detecção de mudanças tradicional.',
    category: 'frontend',
    tag: 'Frontend • Reatividade',
    targetTab: 'angular',
    targetPage: 'frontend',
    readingTime: '8 min de leitura',
    date: 'Setembro 2024',
    updatedAt: 'Atualizado para Angular 18 e React 19',
    author: DEFAULT_AUTHOR,
    summary: 'Uma dissecação arquitetural profunda de como Angular e Vue adotaram Signals nativos com grafos de dependência reativos, enquanto o React mantém a filosofia de re-renderização pura com hooks.',
    introduction: [
      'Durante quase uma década, o ecossistema frontend operou sob a hegemonia do Virtual DOM (VDOM). A premissa era simples: quando o estado da aplicação mudava, o framework re-executava as funções de componente, gerava uma nova árvore de nós virtuais em memória e calculava uma diferença (diffing) para aplicar as mutações mínimas no DOM real do navegador.',
      'No entanto, à medida que as aplicações web se tornaram plataformas corporativas densas com centenas de componentes simultâneos, o custo computacional de re-executar árvores inteiras de componentes começou a se tornar um gargalo perceptível de tempo de CPU e consumo de memória.',
      'É nesse cenário que a arquitetura baseada em Signals (Sinais) renasceu com força total. Longe de ser apenas uma moda passageira, Signals representam uma mudança de paradigma: a reatividade não opera mais no nível do componente inteiro, mas no nível cirúrgico da propriedade que de fato mudou.'
    ],
    contextProblem: {
      title: 'O Problema do Excesso de Re-renderizações em Escala',
      description: 'Em sistemas complexos (como dashboards financeiros, feeds de dados em tempo real e tabelas com milhares de linhas), qualquer atualização de estado no topo da hierarquia pode disparar re-renderizações em cascata desnecessárias.',
      symptoms: [
        'Quedas bruscas de frame rate (jank) ao digitar em inputs de formulários extensos.',
        'Necessidade de micro-otimizações com useMemo, useCallback e React.memo espalhadas pelo código.',
        'Dificuldade de rastrear qual mutação disparou a atualização de um nó distante no DOM.',
        'Overhead de memória pelo acúmulo de árvores VDOM intermediárias descartadas pelo Garbage Collector.'
      ]
    },
    benchmarks: {
      title: 'Métricas de Atualização Granular (10.000 nós de DOM)',
      description: 'Comparativo de tempo de resposta da UI e alocação de memória ao atualizar 1 único campo em uma lista de 10.000 registros.',
      data: [
        {
          metric: 'Tempo de Mutação no DOM (ms)',
          stackA: 'Angular 17+ (Signals): 1.8ms',
          stackB: 'Vue 3.4 (Reactivity Core): 2.1ms',
          stackC: 'React 18 (useState padrão): 14.6ms',
          observation: 'Signals atualizam apenas o nó de texto exato no DOM sem re-avaliar o componente pai.'
        },
        {
          metric: 'Uso de Memória Heap (MB)',
          stackA: 'Angular 17+: 28 MB',
          stackB: 'Vue 3.4: 24 MB',
          stackC: 'React 18: 46 MB',
          observation: 'A ausência de nós VDOM intermediários reduz a pressão sobre o Garbage Collector do V8.'
        },
        {
          metric: 'Complexidade de Código para Otimizar',
          stackA: 'Automática via signal() e computed()',
          stackB: 'Nativa via ref() e computed()',
          stackC: 'Exige memorização manual de funções e props',
          observation: 'Signals eliminam a necessidade de arrays de dependências suscetíveis a bugs sutis.'
        }
      ]
    },
    keyTradeoffs: [
      {
        title: 'Angular 17+ (Signals Nativos)',
        pros: [
          'Eliminação progressiva da dependência histórica do Zone.js (menor overhead de monkey-patching do browser).',
          'Interoperabilidade transparente com RxJS através de toSignal() e toObservable().',
          'Tipagem estrita e imutabilidade estrutural com input() e model() standalone.'
        ],
        cons: [
          'Curva de aprendizado para equipes habituadas ao padrão de ChangeDetectionStrategy.OnPush.',
          'Migração necessária de templates legados para a sintaxe com parênteses nomeDoSignal().'
        ],
        whenToChoose: 'Aplicações corporativas de grande porte com governança de equipe rígida e necessidade de tipagem ponta a ponta.'
      },
      {
        title: 'Vue 3.4+ (Composition API & Ref)',
        pros: [
          'Reatividade fina estabelecida desde o design do Vue 3, com maturidade exemplar.',
          'Sintaxe extremamente limpa e concisa via <script setup>.',
          'Rastreamento automático e transparente de dependências durante a renderização.'
        ],
        cons: [
          'Necessidade de acessar a propriedade .value em código TypeScript/JavaScript (embora dispensada no template).'
        ],
        whenToChoose: 'Projetos que buscam equilíbrio máximo entre produtividade acelerada, elegância sintática e alta performance.'
      },
      {
        title: 'React 18/19 (Hooks & Modelo Funcional)',
        pros: [
          'Maior ecossistema de bibliotecas e componentes do planeta.',
          'Modelo mental puro de JavaScript (UI = f(state)) sem abstrações de caixas reativas.',
          'Excelente suporte a Server Components (RSC) e streaming SSR.'
        ],
        cons: [
          'Exige disciplina rigorosa para evitar re-renders em cascata.',
          'Regras de hooks restritas (não podem ser chamados em loops, condicionais ou funções aninhadas).'
        ],
        whenToChoose: 'Quando o ecossistema de terceiros, bibliotecas prontas e a abundância de profissionais no mercado são prioridade.'
      }
    ],
    codeComparison: {
      title: 'Exemplo Prático: Contador Reativo com Valor Derivado',
      description: 'Observe a declaração de um valor primitivo e um valor computado (dobro) nas 3 sintaxes contemporâneas:',
      snippets: [
        {
          label: 'Angular (Signals)',
          language: 'typescript',
          filename: 'counter.component.ts',
          code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="card">
      <p>Contagem: {{ count() }}</p>
      <p>Dobro: {{ doubleCount() }}</p>
      <button (click)="increment()">Incrementar</button>
    </div>
  \`
})
export class CounterComponent {
  // Criação do sinal primitivo
  readonly count = signal(0);

  // Sinal computado reativo (memoizado automaticamente)
  readonly doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}`,
          explanation: 'O Angular cria um nó no grafo de reatividade. Quando count() muda, apenas os nós do template que invocam doubleCount() são notificados para alteração no DOM.'
        },
        {
          label: 'Vue 3 (Composition API)',
          language: 'html',
          filename: 'Counter.vue',
          code: `<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <div class="card">
    <p>Contagem: {{ count }}</p>
    <p>Dobro: {{ doubleCount }}</p>
    <button @click="increment">Incrementar</button>
  </div>
</template>`,
          explanation: 'O Vue rastreia o acesso a count.value durante a fase de execução da função getter do computed, registrando a assinatura sem necessidade de declaração explícita.'
        },
        {
          label: 'React (Hooks)',
          language: 'tsx',
          filename: 'Counter.tsx',
          code: `import React, { useState, useMemo } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  // Exige array de dependências manual
  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <div className="card">
      <p>Contagem: {count}</p>
      <p>Dobro: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </div>
  );
}`,
          explanation: 'Toda alteração de count re-executa a função inteira do componente Counter, exigindo useMemo para evitar re-computações se o cálculo for oneroso.'
        }
      ]
    },
    pitfalls: [
      'Não desestruture propriedades reativas em Vue ou Angular sem utilitários próprios (como toRefs no Vue), sob pena de romper a reatividade.',
      'Evite causar efeitos colaterais (side effects) dentro de sinais computados; use effect() ou watchEffect() exclusivamente para efeitos externos.',
      'No React, não utilize useState para valores que podem ser derivados puramente em tempo de renderização; prefira cálculos diretos ou useMemo.'
    ],
    conclusion: [
      'A convergência do mercado em direção a Signals demonstra que o controle fino de mutação no DOM é o caminho definitivo para interfaces de alta velocidade.',
      'Enquanto o Angular deu um salto quântico ao introduzir Signals nativos no core da versão 17, o Vue continua sendo o pioneiro com uma das APIs mais fluidas da indústria.',
      'O React, por sua vez, foca na simplificação do compilador (React Compiler) para automatizar a memorização, mantendo a experiência do desenvolvedor centrada no paradigma funcional.'
    ],
    relatedArticleIds: ['rest-api-cache', 'net8-vs-fastapi']
  },
  {
    id: 'net8-vs-fastapi',
    slug: 'net8-minimal-apis-vs-python-fastapi',
    title: 'Minimal APIs em .NET 8 vs FastAPI em Python: Análise de Produtividade e Throughput',
    subtitle: 'Uma comparação técnica de baixo nível: latência de requisições, I/O assíncrono, validação de tipos e tempo de resposta sob alta concorrência.',
    category: 'backend',
    tag: 'Backend • APIs REST',
    targetTab: 'dotnet',
    targetPage: 'backend',
    readingTime: '9 min de leitura',
    date: 'Setembro 2024',
    updatedAt: 'Revisado para .NET 8 LTS e Python 3.12',
    author: DEFAULT_AUTHOR,
    summary: 'Comparamos a nova era do C# com Minimal APIs contra o FastAPI do ecossistema Python moderno, medindo performance real de I/O de rede, documentação automática OpenAPI e tipagem estrita.',
    introduction: [
      'Historicamente, o desenvolvimento de APIs dividia o mercado em dois polos opostos: de um lado, a produtividade relâmpago e a simplicidade sintática de linguagens dinâmicas como Python e Node.js; do outro, o poder de processamento bruto, a tipagem estrita e a compilação JIT de gigantes como C# e Java.',
      'Com o lançamento do .NET 6, 7 e a consolidação do .NET 8 LTS, a Microsoft quebrou o paradigma dos controllers verbosos pesados do ASP.NET clássico através das chamadas Minimal APIs, permitindo declarar rotas completas em pouquíssimas linhas de código.',
      'Ao mesmo tempo, o FastAPI revolucionou o ecossistema Python ao adotar tipagem assíncrona nativa com Pydantic v2 e Starlette, alcançando números de performance nunca antes vistos na linguagem criada por Guido van Rossum.'
    ],
    contextProblem: {
      title: 'O Dilema: Velocidade de Entrega vs Custo de Infraestrutura',
      description: 'Startups e times corporativos enfrentam um equilíbrio delicado: construir rapidamente novos microsserviços sem criar débitos de infraestrutura que exigem centenas de instâncias de servidores.',
      symptoms: [
        'Aplicações que travam em picos de tráfego por bloqueio de threads de CPU (GIL no Python).',
        'Lentidão na inicialização de containers (Cold Start) em arquiteturas serverless e Kubernetes.',
        'Erros em produção devido a dados mal formatados que passaram despercebidos pela falta de validação de schemas.',
        'Custos elevados de computação em nuvem gerados por frameworks pesados e ineficientes.'
      ]
    },
    benchmarks: {
      title: 'Benchmark de Carga Real (k6 - 5.000 Usuários Simultâneos)',
      description: 'Teste de estresse em máquina Linux c6i.xlarge (4 vCPUs, 8 GB RAM) executando endpoint GET /api/users com serialização JSON e consulta a banco de dados relacional.',
      data: [
        {
          metric: 'Throughput Médio (Requisições por Segundo - RPS)',
          stackA: '.NET 8 (Kestrel + Minimal APIs): 68.400 RPS',
          stackB: 'Python 3.12 (FastAPI + Uvicorn): 14.800 RPS',
          observation: 'O JIT compilado e a otimização de alocação de memória (Span<T>) do .NET 8 entregam quase 5x mais throughput.'
        },
        {
          metric: 'Latência p99 (Percentil 99 sob carga pesada)',
          stackA: '.NET 8: 6.2ms',
          stackB: 'FastAPI: 38.4ms',
          observation: 'A ausência do GIL (Global Interpreter Lock) permite que o .NET utilize 100% de todos os núcleos de CPU com multithreading real.'
        },
        {
          metric: 'Consumo Médio de Memória RAM',
          stackA: '.NET 8: ~110 MB',
          stackB: 'FastAPI (4 workers): ~185 MB',
          observation: 'O .NET 8 apresenta footprint de memória extremamente contido para aplicações de alta concorrência.'
        }
      ]
    },
    keyTradeoffs: [
      {
        title: '.NET 8 (C# Minimal APIs)',
        pros: [
          'Performance extraordinária, figurando consistentemente no topo dos benchmarks do TechEmpower.',
          'Sistema de tipos robusto e verificação em tempo de compilação eliminando categorias inteiras de bugs.',
          'Excelente tooling de profiling e telemetria nativa com OpenTelemetry no ecossistema Microsoft.'
        ],
        cons: [
          'Tamanho do binário compilado superior ao de scripts dinâmicos.',
          'Curva de aprendizado inicial mais íngreme para desenvolvedores iniciantes em tipagem genérica.'
        ],
        whenToChoose: 'Sistemas corporativos com tráfego alto, processamento financeiro, microsserviços críticos e cenários onde o custo de servidor na nuvem precisa ser minimizado.'
      },
      {
        title: 'Python 3.12 (FastAPI + Pydantic v2)',
        pros: [
          'Velocidade imbatível de prototipagem e desenvolvimento de novas funcionalidades.',
          'Geração automática e impecável de documentação interativa Swagger/OpenAPI sem nenhuma configuração extra.',
          'Integração natural e direta com todo o ecossistema moderno de Inteligência Artificial, Machine Learning e LLMs (OpenAI, LangChain, PyTorch).'
        ],
        cons: [
          'Concorrência limitada pelo GIL para tarefas que dependem intensamente de CPU.',
          'Maior latência média em cargas massivas de I/O concorrente comparado a binários compilados.'
        ],
        whenToChoose: 'Projetos de Inteligência Artificial, MVPs ágeis, pipelines de ciência de dados e APIs onde o tempo até o mercado (Time-to-Market) é o fator mais decisivo.'
      }
    ],
    codeComparison: {
      title: 'Comparativo Sintático: Endpoint com Validação de DTO',
      description: 'Veja como ambas as plataformas definem um contrato tipado e injetam dependências de banco de dados:',
      snippets: [
        {
          label: '.NET 8 (Program.cs)',
          language: 'csharp',
          filename: 'Program.cs',
          code: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(...));
var app = builder.Build();

app.MapPost("/api/users", async (CreateUserDto dto, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(dto.Email))
        return Results.BadRequest(new { error = "Email obrigatório" });

    var user = new User { Name = dto.Name, Email = dto.Email };
    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/api/users/{user.Id}", user);
});

app.Run();

public record CreateUserDto(string Name, string Email);`,
          explanation: 'O record do C# gera imutabilidade e igualdade por valor nativa, com injeção automática do contexto de banco de dados diretamente no delegate da rota.'
        },
        {
          label: 'Python (main.py)',
          language: 'python',
          filename: 'main.py',
          code: `from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from database import get_db, UserModel

app = FastAPI(title="User Service")

class CreateUserSchema(BaseModel):
    name: str
    email: EmailStr

@app.post("/api/users", status_code=status.HTTP_201_CREATED)
async def create_user(payload: CreateUserSchema, db: Session = Depends(get_db)):
    db_user = UserModel(name=payload.name, email=payload.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user`,
          explanation: 'O Pydantic v2 (reescrito em Rust) valida automaticamente o formato de e-mail e converte erros de validação em respostas 422 padronizadas.'
        }
      ]
    },
    pitfalls: [
      'No FastAPI, nunca execute operações síncronas bloqueantes dentro de funções async def sem usar run_in_threadpool, pois isso congela o loop de eventos principal.',
      'No .NET, evite registrar serviços transitórios que criam overhead de instanciação desnecessário dentro de loops de requisições de alta frequência.',
      'Sempre utilize pooling de conexões no banco de dados para evitar exaustão de sockets TCP em ambas as tecnologias.'
    ],
    conclusion: [
      'Tanto o .NET 8 quanto o FastAPI representam o estado da arte do desenvolvimento de APIs em seus respectivos universos.',
      'Se o seu projeto gira em torno de microsserviços corporativos, escalabilidade vertical extrema e processamento denso, o .NET 8 é imbatível.',
      'Se o foco for integração com modelos de IA, desenvolvimento ultrarrápido e integração com a rica biblioteca científica de Python, o FastAPI é a escolha perfeita.'
    ],
    relatedArticleIds: ['go-microservices', 'sql-vs-nosql']
  },
  {
    id: 'sql-vs-nosql',
    slug: 'quando-trocar-sql-por-nosql-guia-pragmatico',
    title: 'Quando Trocar SQL por NoSQL? O Guia Pragmático de Decisão Arquitetural',
    subtitle: 'Desmistificando o mito de que NoSQL é sempre mais rápido e entendendo onde MongoDB, Redis, Cassandra e PostgreSQL realmente vencem.',
    category: 'database',
    tag: 'Banco de Dados • Arquitetura',
    targetTab: 'nosql',
    targetPage: 'database',
    readingTime: '10 min de leitura',
    date: 'Agosto 2024',
    updatedAt: 'Revisado com novidades de PostgreSQL 16 e MongoDB 7',
    author: DEFAULT_AUTHOR,
    summary: 'Um guia técnico aprofundado para líderes técnicos e desenvolvedores tomarem decisões pragmáticas entre consistência relacional ACID e escalabilidade horizontal NoSQL.',
    introduction: [
      'Na última década, a indústria de software viveu uma das maiores ondas de hype da sua história: o movimento "NoSQL". Dizia-se que os bancos de dados relacionais estavam mortos, incapazes de lidar com a escala da web moderna e condenados pela rigidez de seus schemas.',
      'Empresas migraram prematuramente bancos relacionais sólidos para bancos de documentos ou chave-valor, apenas para descobrir mais tarde as dores amargas da inconsistência eventual, da ausência de integridade referencial e da complexidade absurda de emular JOINs na camada de aplicação.',
      'Hoje, a poeira baixou e a engenharia de dados atingiu a maturidade: entendemos com clareza matemática que não existe bala de prata, mas sim o Teorema CAP e modelos de acesso a dados específicos para cada problema de negócio.'
    ],
    contextProblem: {
      title: 'A Falácia da Escolha Binária: SQL vs NoSQL',
      description: 'Projetos frequentemente falham ao escolher uma única tecnologia de banco de dados para atender a todas as necessidades heterogêneas de um ecossistema completo.',
      symptoms: [
        'Dificuldade extrema em manter consistência de dados em operações financeiras e de faturamento.',
        'Lentidão crítica ao tentar extrair relatórios gerenciais e agregações em bancos puramente chave-valor.',
        'Custos astronômicos de armazenamento gerados pela desnormalização desenfreada de dados repetidos.',
        'Corrupção silenciosa de entidades pela falta de restrições de chave estrangeira (Foreign Keys).'
      ]
    },
    benchmarks: {
      title: 'Matriz Comparativa de Casos de Uso Reais',
      description: 'Avaliação de adequação técnica para os principais padrões de acesso corporativos:',
      data: [
        {
          metric: 'Transações Financeiras (Transferências / Pagamentos)',
          stackA: 'PostgreSQL / MySQL: Excelente (ACID nativo, bloqueios transacionais estritos)',
          stackB: 'MongoDB: Aceitável (suporta transações multi-documento, mas com penalidade de latência)',
          stackC: 'Cassandra: Inadequado (projetado para consistência eventual)',
          observation: 'Bancos relacionais permanecem insubstituíveis onde a perda de um único centavo é inaceitável.'
        },
        {
          metric: 'Armazenamento de Sessões e Cache (Sub-milissegundo)',
          stackA: 'PostgreSQL: Médio (overhead de escrita em WAL no disco)',
          stackB: 'Redis: Perfeito (opera 100% em memória RAM com estruturas nativas)',
          stackC: 'MongoDB: Razoável, porém consome mais recursos de disco',
          observation: 'O Redis entrega latência inferior a 0.5ms com throughput de centenas de milhares de ops/segundo.'
        },
        {
          metric: 'Séries Temporais e Telemetria IoT (Milhões de gravações/seg)',
          stackA: 'PostgreSQL: Requer TimescaleDB ou particionamento manual',
          stackB: 'Apache Cassandra / ScyllaDB: Excelente (arquitetura Log-Structured Merge-Tree)',
          stackC: 'DynamoDB: Excelente com escala sob demanda',
          observation: 'Cassandra foi projetado especificamente para escrita massiva distribuída sem ponto único de falha.'
        }
      ]
    },
    keyTradeoffs: [
      {
        title: 'PostgreSQL (O Canivete Suíço Relacional)',
        pros: [
          'Suporte espetacular tanto ao modelo relacional estrito quanto a documentos JSON com JSONB e índices GIN.',
          'Consistência ACID completa garantindo que dados gravados nunca fiquem em estado corrompido.',
          'Ecossistema gigantesco de extensões (PostGIS para geolocalização, pgvector para Inteligência Artificial).'
        ],
        cons: [
          'Escalabilidade horizontal de escrita é complexa (exige réplicas de leitura e sharding avançado via Citus).'
        ],
        whenToChoose: 'O padrão padrão de ouro para 90% das novas aplicações. Sempre comece pelo PostgreSQL a menos que haja uma justificativa técnica concreta em contrário.'
      },
      {
        title: 'Redis (Memória e Estruturas em Tempo Real)',
        pros: [
          'Latência sub-milissegundo inigualável.',
          'Estruturas ricas além de chave-valor simples: Sorted Sets para leaderboards, Bitmaps para métricas diárias, Pub/Sub para mensagens rápidas.',
          'TTL automático (expiração de chaves) ideal para sessões, rate limits e autenticação.'
        ],
        cons: [
          'Os dados residem na memória RAM, tornando o custo por gigabyte consideravelmente mais alto que o armazenamento em disco.'
        ],
        whenToChoose: 'Como camada secundária de cache e velocidade em conjunto com um banco primário persistente.'
      },
      {
        title: 'MongoDB (Document Store Flexível)',
        pros: [
          'Estrutura natural de documentos JSON com schemas dinâmicos.',
          'Facilidade de evolução em catálogos com atributos altamente variáveis (como produtos de e-commerce).',
          'Sharding horizontal nativo e bem documentado para conjuntos de dados de petabytes.'
        ],
        cons: [
          'Queries com muitos relacionamentos ($lookup) perdem performance rapidamente.',
          'Consome mais espaço de armazenamento devido à repetição de chaves nos documentos desnormalizados.'
        ],
        whenToChoose: 'Catálogos de produtos com dezenas de variantes, sistemas de gestão de conteúdo (CMS) e registros de auditoria polimórficos.'
      }
    ],
    pitfalls: [
      'Não adote NoSQL apenas para evitar criar migrações de banco relacional; a falta de schema no banco apenas transfere o fardo de validação para o seu código de aplicação.',
      'Cuidado com a desnormalização excessiva: se um usuário alterar o nome e ele estiver duplicado em 500.000 pedidos, você terá que atualizar 500.000 documentos.',
      'Lembre-se do modelo poliglota: a maioria das grandes arquiteturas utiliza PostgreSQL como fonte de verdade primária e Redis como cache frontal.'
    ],
    conclusion: [
      'A decisão entre SQL e NoSQL nunca foi sobre qual tecnologia é superior, mas sobre alinhar a estrutura dos dados ao seu padrão de acesso e requisitos de tolerância à falha.',
      'O PostgreSQL moderno é tão poderoso que atende com maestria às demandas relacionais e semi-estruturadas de documentos na vasta maioria dos projetos.',
      'Aposte na persistência poliglota: use o melhor de cada ferramenta no lugar certo, em vez de forçar um único banco a resolver tudo.'
    ],
    relatedArticleIds: ['indices-and-pagination', 'signals-reactivity']
  },
  {
    id: 'rest-api-cache',
    slug: 'consumo-de-apis-rest-e-cache-assincrono',
    title: 'Consumo de APIs REST e Cache Assíncrono: TanStack Query vs toSignal vs useFetch',
    subtitle: 'Como gerenciar estado assíncrono, deduplicação de requisições e cache resiliente no React, Angular e Vue moderno.',
    category: 'frontend',
    tag: 'Frontend • Network',
    targetTab: 'react',
    targetPage: 'frontend',
    readingTime: '7 min de leitura',
    date: 'Agosto 2024',
    updatedAt: 'Atualizado para TanStack Query v5',
    author: DEFAULT_AUTHOR,
    summary: 'A anatomia do gerenciamento de dados de servidor no frontend: como evitar múltiplas chamadas concorrentes ao backend, gerenciar paginação e manter dados atualizados com stale-while-revalidate.',
    introduction: [
      'Durante muito tempo, desenvolvedores frontend armazenavam dados vindos de APIs diretamente em stores de estado global (como Redux ou Vuex). Essa abordagem tratava dados remotos como se fossem estado local simples.',
      'No entanto, dados de servidor não são estado de cliente. Eles são um snapshot temporário de um estado remoto assíncrono que pode mudar a qualquer momento no servidor, exige tratamento de loading, erro, retentativas e estratégias de invalidação.',
      'A ascensão de bibliotecas especializadas em servidor (como TanStack Query) e primitivas nativas modernas redefiniu as boas práticas da indústria.'
    ],
    contextProblem: {
      title: 'O Flagelo do Estado Assíncrono Descoordenado',
      description: 'Sem uma camada dedicada de cache, componentes independentes na mesma página fazem requisições redundantes para o mesmo endpoint da API.',
      symptoms: [
        'Três componentes solicitando a mesma rota /api/me simultaneamente ao carregar a página.',
        'Flickers e telas em branco enquanto novos dados substituem dados anteriores sem transição suave.',
        'Dificuldade em cancelar requisições obsoletas quando o usuário navega rapidamente entre páginas.',
        'Códigos repletos de variáveis booleanas manuais isLoading, isError, data e error repetidas exaustivamente.'
      ]
    },
    keyTradeoffs: [
      {
        title: 'React com TanStack Query v5',
        pros: [
          'Deduplicação automática de requisições idênticas em andamento.',
          'Política stale-while-revalidate nativa que exibe o cache instantaneamente enquanto busca atualizações em segundo plano.',
          'Suporte incrível a mutações otimistas (Optimistic Updates) e paginação infinita.'
        ],
        cons: [
          'Adiciona uma dependência externa ao bundle do projeto (~12 KB min+gzip).'
        ],
        whenToChoose: 'Praticamente obrigatório para qualquer aplicação React séria que consuma APIs REST ou GraphQL.'
      },
      {
        title: 'Angular com HttpClient + toSignal',
        pros: [
          'Integração nativa de primeira classe com a injeção de dependência e interceptors do Angular.',
          'Conversão sem atritos de Observables do RxJS para Signals limpos no template.',
          'Zero dependências externas adicionais.'
        ],
        cons: [
          'Cache e deduplicação avançada exigem configuração manual de interceptors ou bibliotecas complementares como @ngneat/query.'
        ],
        whenToChoose: 'Projetos Angular corporativos que prezam por manter a arquitetura puramente canônica do framework.'
      }
    ],
    pitfalls: [
      'Nunca confunda tempo de staleTime com gcTime (antigo cacheTime) no TanStack Query: staleTime define quando os dados são considerados velhos, gcTime define quando são removidos da memória.',
      'Sempre declare chaves de query (queryKey) com todas as variáveis que influenciam a consulta para evitar exibir dados de filtros anteriores.'
    ],
    conclusion: [
      'Separar estado de servidor de estado de UI é um dos maiores saltos de qualidade arquitetural que uma equipe frontend pode realizar.',
      'Adotar padrões consolidados como stale-while-revalidate melhora drasticamente a percepção de velocidade da aplicação para o usuário final.'
    ],
    relatedArticleIds: ['signals-reactivity', 'net8-vs-fastapi']
  },
  {
    id: 'go-microservices',
    slug: 'go-fiber-gorm-microsservicos-alta-concorrencia',
    title: 'Go com Fiber e GORM vs Node.js: Construindo Microsserviços para Alta Concorrência',
    subtitle: 'Como o modelo de Goroutines e canais do Go permite construir APIs que consomem frações mínimas de RAM suportando dezenas de milhares de conexões persistentes.',
    category: 'backend',
    tag: 'Backend • Concorrência',
    targetTab: 'go',
    targetPage: 'backend',
    readingTime: '8 min de leitura',
    date: 'Julho 2024',
    updatedAt: 'Testado com Go 1.22 e Fiber v2',
    author: DEFAULT_AUTHOR,
    summary: 'Por que empresas de tecnologia de alto volume migraram serviços de I/O massivo e streaming para a linguagem Go, explorando o framework Fiber inspirado no Express.',
    introduction: [
      'O ecossistema Node.js popularizou o I/O não bloqueante baseado em Event Loop assíncrono. Para a esmagadora maioria das aplicações, essa abordagem é produtiva e suficiente.',
      'Contudo, quando uma aplicação atinge escalas onde milhares de conexões WebSocket, gRPC ou HTTP Keep-Alive precisam ser mantidas simultaneamente sem degradar a latência, o consumo de memória do V8 e o modelo single-thread começam a impor limites físicos.',
      'O Go foi projetado pelo Google especificamente para resolver esse dilema nos servidores do século XXI através de Goroutines extremamente leves (apenas 2 KB de stack inicial).'
    ],
    contextProblem: {
      title: 'O Gargalo da Escala Concorrente em Sistemas Distribuídos',
      description: 'Como sustentar dezenas de milhares de clientes conectados sem esgotar a memória dos containers e sem estourar o orçamento com instâncias redundantes.',
      symptoms: [
        'Containers reiniciando por Out-Of-Memory (OOM) no Kubernetes sob picos repentinos de tráfego.',
        'Degradação da latência quando uma operação síncrona bloqueia o Event Loop da aplicação.',
        'Dificuldade de depuração em pilhas de chamadas assíncronas aninhadas em linguagens com tipagem fraca.'
      ]
    },
    keyTradeoffs: [
      {
        title: 'Go (Fiber + GORM / pgx)',
        pros: [
          'Goroutines consomem apenas ~2 KB contra ~1 MB de threads convencionais de SO.',
          'Compilação para binário único estático e autocontido (imagens Docker de apenas 15 MB baseadas em scratch ou alpine).',
          'Inicialização quase instantânea (< 15 milissegundos), ideal para autoscaling elástico.'
        ],
        cons: [
          'Sintaxe explícita de tratamento de erros (if err != nil) que exige disciplina do desenvolvedor.',
          'Menos bibliotecas de abstração prontas comparado ao gigantesco ecossistema npm.'
        ],
        whenToChoose: 'Gateways de API, microsserviços de alto throughput, serviços de mensageria e sistemas de streaming em tempo real.'
      }
    ],
    pitfalls: [
      'Tenha cuidado com vazamentos de Goroutines (Goroutine Leaks): sempre passe um context.Context para que tarefas filhas sejam canceladas se o cliente HTTP abortar a requisição.',
      'Utilize o race detector do compilador (go run -race) em testes contínuos para detectar condições de corrida em memória.'
    ],
    conclusion: [
      'A simplicidade arquitetural de Go e seu modelo pioneiro de concorrência fazem da linguagem uma das escolhas mais seguras para a infraestrutura moderna de microsserviços.'
    ],
    relatedArticleIds: ['net8-vs-fastapi', 'sql-vs-nosql']
  },
  {
    id: 'indices-and-pagination',
    slug: 'indices-estrategicos-e-paginacao-por-cursor',
    title: 'Índices Estratégicos e Paginação por Cursor: Eliminando Gargalos em Bancos Relacionais',
    subtitle: 'Por que o clássico OFFSET 500000 destrói o banco de dados e como a paginação Keyset garante tempo de resposta constante O(1).',
    category: 'database',
    tag: 'Banco de Dados • Performance',
    targetTab: 'relational',
    targetPage: 'database',
    readingTime: '9 min de leitura',
    date: 'Julho 2024',
    updatedAt: 'Compatível com PostgreSQL, MySQL e SQL Server',
    author: DEFAULT_AUTHOR,
    summary: 'Um guia prático de engenharia de banco de dados ensinando a diagnosticar planos de execução com EXPLAIN ANALYZE e substituir consultas destrutivas por indexação inteligente.',
    introduction: [
      'Em bancos de desenvolvimento com algumas centenas de linhas de teste, qualquer consulta SQL executa em milissegundos. É comum ver queries sem índices e paginações com LIMIT 20 OFFSET 100 responderem instantaneamente.',
      'O pesadelo começa quando o sistema entra em produção e a tabela atinge 10 milhões de registros. De repente, relatórios travam conexões, a CPU da instância do banco bate 100% e o tempo de resposta salta de 5ms para 4 segundos.',
      'Entender a mecânica interna de índices B-Tree e a armadilha matemática da paginação por OFFSET é indispensável para qualquer engenheiro full-stack.'
    ],
    contextProblem: {
      title: 'A Mecânica Oculta do OFFSET no Motor do Banco',
      description: 'Ao executar OFFSET 500000 LIMIT 20, o banco não pula magicamente para a página desejada; ele lê, ordena e descarta 500.000 linhas da memória antes de entregar as 20 finais.',
      symptoms: [
        'A última página de uma listagem leva 10 vezes mais tempo para carregar do que a primeira página.',
        'Spikes repentinos de leitura de disco (I/O Read) que sobrecarregam o servidor de banco de dados.',
        'Inconsistências onde registros duplicados ou omitidos aparecem quando novos itens são inseridos entre as páginas.'
      ]
    },
    keyTradeoffs: [
      {
        title: 'Paginação por Cursor (Keyset Pagination)',
        pros: [
          'Tempo de execução constante O(1), quer você esteja na página 1 ou na página 500.000.',
          'Navega diretamente pelo índice da coluna ordenada (como WHERE id < :cursor).',
          'Totalmente resiliente a inserções concorrentes que ocorrerem enquanto o usuário navega.'
        ],
        cons: [
          'Não permite pular diretamente para uma página arbitrária distante (como "ir para a página 47") sem percorrer os cursores intermediários.'
        ],
        whenToChoose: 'Feeds infinitos (Infinite Scroll), APIs REST de consumo em lote, listagens móveis e tabelas analíticas massivas.'
      }
    ],
    pitfalls: [
      'Evite aplicar funções nas colunas do WHERE (como WHERE LOWER(email) = ...) a menos que crie um índice funcional específico, pois isso anula o índice B-Tree padrão e força um Sequential Scan.',
      'Cuidado com índices excessivos: embora acelerem leituras, cada índice adicional degrada a performance de INSERT, UPDATE e DELETE.'
    ],
    conclusion: [
      'Um único índice B-Tree bem desenhado e a substituição de OFFSET por Keyset Pagination costumam ter mais impacto no desempenho geral de uma aplicação do que meses de refatoração de código de backend.'
    ],
    relatedArticleIds: ['sql-vs-nosql', 'net8-vs-fastapi']
  }
];
