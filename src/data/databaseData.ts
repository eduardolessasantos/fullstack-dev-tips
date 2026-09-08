import { NoSQLItem, RelationalOptimization } from '../types.ts';

export const NOSQL_DATA: NoSQLItem[] = [
  {
    name: 'MongoDB',
    category: 'Document Store (BSON / JSON)',
    whenToUse: 'Sistemas com schemas flexíveis e dinâmicos, catálogos de e-commerce, perfis de usuários, CMS e pipelines de dados com documentos aninhados.',
    whenNotToUse: 'Transações financeiras complexas entre múltiplas entidades não relacionadas ou quando integridade relacional estrita for prioridade.',
    dataModel: 'Coleções de documentos JSON/BSON com suporte a índices secundários, agregações ricas e sharding horizontal.',
    queryLang: 'javascript',
    exampleQuery: `// Busca paginada com agregação e projeção em MongoDB
db.orders.aggregate([
  { $match: { status: "DELIVERED", createdAt: { $gte: ISODate("2024-01-01") } } },
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "customer" } },
  { $unwind: "$customer" },
  { $project: { orderId: 1, total: 1, "customer.name": 1, "customer.email": 1 } },
  { $sort: { createdAt: -1 } },
  { $limit: 10 }
]);`
  },
  {
    name: 'Redis',
    category: 'In-Memory Key-Value & Data Structures',
    whenToUse: 'Camada de Cache ultra-rápida (sub-milissegundo), sessões de usuário, filas assíncronas, rate limiting, leaderboards e pub/sub.',
    whenNotToUse: 'Armazenamento primário permanente para dados volumosos com retenção de longo prazo ou relações complexas.',
    dataModel: 'Chave-valor em memória RAM suportando Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps e Streams com TTL (expiração automática).',
    queryLang: 'bash',
    exampleQuery: `# Definir cache com expiração de 1 hora (3600 segundos)
SET user:profile:1024 '{"id":1024,"name":"Carlos","tier":"pro"}' EX 3600

# Adicionar pontuação em ranking ordenado (Leaderboard)
ZADD leaderboard:weekly 1450 "player_carlos"

# Obter o top 3 do ranking
ZREVRANGE leaderboard:weekly 0 2 WITHSCORES`
  },
  {
    name: 'Apache Cassandra',
    category: 'Wide-Column Store (Distribuído)',
    whenToUse: 'Volume massivo de gravações (Write-Heavy), séries temporais (IoT), telemetria, feeds de atividades e replicação multi-datacenter sem ponto único de falha.',
    whenNotToUse: 'Sistemas que exigem queries ad-hoc dinâmicas, operações de JOIN ou atualizações concorrentes no mesmo registro.',
    dataModel: 'Tabelas colunares distribuídas indexadas por Partition Key e Clustering Key (CQL - Cassandra Query Language).',
    queryLang: 'sql',
    exampleQuery: `-- Criação de tabela desenhada estritamente para o padrão de leitura (IoT)
CREATE TABLE sensor_readings (
    sensor_id uuid,
    day date,
    read_time timestamp,
    temperature double,
    humidity double,
    PRIMARY KEY ((sensor_id, day), read_time)
) WITH CLUSTERING ORDER BY (read_time DESC);

-- Leitura de alta performance por chave de partição
SELECT * FROM sensor_readings 
WHERE sensor_id = 7a8c3d-e4f1-4a2b 
  AND day = '2024-03-15'
LIMIT 50;`
  },
  {
    name: 'Amazon DynamoDB',
    category: 'Serverless Managed NoSQL',
    whenToUse: 'Aplicações nativas da nuvem AWS, arquiteturas Serverless (Lambda), carrinhos de compras e sistemas com latência consistente de 1 dígito em qualquer escala.',
    whenNotToUse: 'Aplicações que exigem consultas analíticas complexas sem desenhar Global Secondary Indexes (GSIs) antecipadamente.',
    dataModel: 'Key-Value e Document Store gerenciado, particionado por Partition Key (HASH) e Sort Key (RANGE) opcional.',
    queryLang: 'json',
    exampleQuery: `// Exemplo de chamada via AWS SDK v3 (JavaScript / Node.js)
import { QueryCommand } from "@aws-sdk/client-dynamodb";

const command = new QueryCommand({
  TableName: "UserOrders",
  KeyConditionExpression: "UserId = :uid AND OrderDate >= :since",
  ExpressionAttributeValues: {
    ":uid": { S: "usr_9981" },
    ":since": { S: "2024-01-01" }
  },
  Limit: 20
});`
  }
];

export const RELATIONAL_OPTIMIZATIONS: RelationalOptimization[] = [
  {
    id: 'indices',
    title: '1. Índices Estratégicos (B-Tree vs GIN)',
    badge: 'Indexação',
    summary: 'Escolher a estrutura correta de índice evita varreduras de tabela inteira (Seq Scan).',
    problem: 'Tabelas com milhões de linhas ficam lentas ao buscar por colunas com alta cardinalidade ou campos JSON/texto sem índice específico.',
    solution: 'Use B-Tree para igualdades (=), ordenação (<, >) e chaves estrangeiras. Use GIN (Generalized Inverted Index) para colunas JSONB, arrays e busca Full-Text.',
    sqlBefore: `-- Sem índice adequado: Executa Seq Scan em 5 milhões de linhas (~1800ms)
SELECT id, email, created_at FROM users 
WHERE email = 'dev@codecompare.com';`,
    sqlAfter: `-- Criação de índice único B-Tree + índice GIN para tags/JSON
CREATE UNIQUE INDEX idx_users_email ON users (email);
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);

-- Nova execução: Index Scan instantâneo (< 2ms)
SELECT id, email, created_at FROM users 
WHERE email = 'dev@codecompare.com';`,
    impact: 'Redução de 99.8% no tempo de resposta (de 1800ms para 1.4ms)'
  },
  {
    id: 'explain',
    title: '2. EXPLAIN (ANALYZE, BUFFERS)',
    badge: 'Diagnóstico',
    summary: 'Diagnosticar o custo real e o plano de execução antes de tentar otimizar no escuro.',
    problem: 'Desenvolvedores otimizam queries assumindo gargalos sem saber se o tempo foi gasto em I/O de disco, ordenação em memória ou joins ineficientes.',
    solution: 'Execute sempre EXPLAIN (ANALYZE, BUFFERS) para ver o tempo real por nó, quantidade de páginas de buffer lidas da memória vs lidas do disco.',
    sqlBefore: `-- Executar a query cegamente sem métricas
SELECT o.id, c.name, SUM(i.price * i.qty)
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items i ON i.order_id = o.id
GROUP BY o.id, c.name;`,
    sqlAfter: `-- Analisar métricas de execução do PostgreSQL
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)
SELECT o.id, c.name, SUM(i.price * i.qty)
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items i ON i.order_id = o.id
GROUP BY o.id, c.name;
-- Procure por: "Seq Scan", "Buffers: read (disco)", "Hash Join", "Sort Method: external merge disk"`,
    impact: 'Identifica nós com I/O de disco desnecessário e falta de memória em work_mem'
  },
  {
    id: 'n-plus-1',
    title: '3. Prevenção do Problema N+1 em ORMs',
    badge: 'Arquitetura',
    summary: 'Substituir loops de queries secundárias por Eager Loading ou consultas agregadas.',
    problem: 'Um endpoint que lista 50 pedidos faz 1 query para buscar pedidos e depois 50 queries individuais para carregar os itens de cada pedido (51 queries ao banco).',
    solution: 'Utilize JOIN FETCH (Hibernate/JPA), Include() (Entity Framework), select_related/prefetch_related (Django/SQLAlchemy) ou Preload() (GORM).',
    sqlBefore: `-- Problema N+1 gerado por ORM descuidado (1 + 50 queries)
SELECT * FROM orders LIMIT 50;
SELECT * FROM order_items WHERE order_id = 1;
SELECT * FROM order_items WHERE order_id = 2;
-- ... repetido 50 vezes!`,
    sqlAfter: `-- Solução com Eager Loading (1 query única com JOIN ou 2 queries em lote com IN)
SELECT o.id, o.total, i.id AS item_id, i.product_name, i.price
FROM orders o
LEFT JOIN order_items i ON i.order_id = o.id
WHERE o.id IN (SELECT id FROM orders LIMIT 50);`,
    impact: 'Redução de 51 round-trips de rede para apenas 1 query consolidada'
  },
  {
    id: 'cursor-pagination',
    title: '4. Paginação por Cursor (Keyset Pagination)',
    badge: 'Performance',
    summary: 'Eliminar OFFSET alto para garantir tempo constante O(1) em tabelas gigantes.',
    problem: 'OFFSET 500000 obriga o banco a escanear e descartar 500.000 linhas antes de retornar as próximas 20, causando lentidão exponencial nas páginas finais.',
    solution: 'Substitua OFFSET por filtro na chave primária ou coluna ordenada: WHERE id < cursor ORDER BY id DESC LIMIT 20.',
    sqlBefore: `-- Lento: O banco precisa ler e descartar 500 mil registros (Tempo: ~850ms)
SELECT id, title, created_at FROM logs 
ORDER BY id DESC 
OFFSET 500000 LIMIT 20;`,
    sqlAfter: `-- Rápido (Keyset Pagination): Usa o índice diretamente (Tempo: ~1.2ms)
-- O cliente envia o ID do último registro da página anterior como cursor
SELECT id, title, created_at FROM logs 
WHERE id < 4599980 
ORDER BY id DESC 
LIMIT 20;`,
    impact: 'Tempo de consulta constante O(1) mesmo na página 100.000 da tabela'
  },
  {
    id: 'caching-strategy',
    title: '5. Caching Estratégico (Cache-Aside Pattern)',
    badge: 'Escalabilidade',
    summary: 'Proteger o banco relacional de leituras repetitivas com uma camada de cache em memória.',
    problem: 'Milhares de requisições simultâneas executam a mesma consulta agregada complexa ou leitura de catálogo estático, sobrecarregando conexões do banco.',
    solution: 'Implemente o padrão Cache-Aside com Redis: Verifique o cache primeiro; em caso de Miss, consulte o banco, popule o cache com TTL curto e retorne.',
    sqlBefore: `-- 5.000 req/s batendo direto no PostgreSQL:
SELECT c.name, COUNT(p.id) AS total_products
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name;`,
    sqlAfter: `-- Pseudo-código de aplicação com Redis Cache-Aside:
-- 1. cached = redis.get("catalog:categories_summary")
-- 2. if (cached) return cached;
-- 3. data = db.query("SELECT c.name, COUNT(p.id) ...")
-- 4. redis.set("catalog:categories_summary", data, EX=300) # 5 minutos
-- 5. return data;`,
    impact: 'Alivia até 95% do throughput de leitura das instâncias primárias do banco'
  },
  {
    id: 'partitioning',
    title: '6. Particionamento de Tabelas (Declarative Partitioning)',
    badge: 'Big Data',
    summary: 'Dividir tabelas que ultrapassam centenas de milhões de linhas em partições lógicas menores.',
    problem: 'Tabelas monolíticas de auditoria, faturamento ou métricas crescem tanto que os próprios índices deixam de caber na memória RAM.',
    solution: 'Particione a tabela por intervalo de datas (Range Partitioning). O otimizador de queries utiliza "Partition Pruning" para consultar apenas o mês desejado.',
    sqlBefore: `-- Tabela monolítica de 200 milhões de registros de auditoria
CREATE TABLE audit_logs (
    id bigserial,
    event_time timestamp not null,
    payload jsonb
);`,
    sqlAfter: `-- Tabela particionada nativamente por intervalo de data (PostgreSQL 12+)
CREATE TABLE audit_logs (
    id bigserial,
    event_time timestamp not null,
    payload jsonb
) PARTITION BY RANGE (event_time);

-- Criação de partições mensais
CREATE TABLE audit_logs_2024_01 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE audit_logs_2024_02 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');`,
    impact: 'Permite queries rápidas com Partition Pruning e descarte de dados velhos com DROP TABLE instantâneo'
  }
];

export interface RecentArticle {
  id: string;
  title: string;
  tag: string;
  category: 'frontend' | 'backend' | 'database';
  targetTab?: string;
  summary: string;
  readingTime: string;
  date: string;
}

export const RECENT_ARTICLES: RecentArticle[] = [
  {
    id: 'art-1',
    title: 'Signals: O futuro da reatividade no Angular vs Vue vs React',
    tag: 'Frontend',
    category: 'frontend',
    targetTab: 'angular',
    summary: 'Como Angular 17 e Vue 3 adotaram a reatividade por Signals granular e por que o React continua fiel ao modelo de re-render com useState.',
    readingTime: '5 min de leitura',
    date: 'Setembro 2024'
  },
  {
    id: 'art-2',
    title: 'Minimal APIs em .NET 8 vs FastAPI em Python: Qual é mais produtivo?',
    tag: 'Backend',
    category: 'backend',
    targetTab: 'dotnet',
    summary: 'Comparação de sintaxe, performance bruta de I/O e facilidade de tipagem entre a nova geração do C# e o queridinho do ecossistema Python.',
    readingTime: '7 min de leitura',
    date: 'Setembro 2024'
  },
  {
    id: 'art-3',
    title: 'Quando trocar SQL por NoSQL? Um guia pragmático sem hype',
    tag: 'Banco de Dados',
    category: 'database',
    targetTab: 'nosql',
    summary: 'MongoDB, Redis, Cassandra e DynamoDB explicados: onde cada tecnologia brilha e em quais cenários um bom banco relacional continua imbatível.',
    readingTime: '6 min de leitura',
    date: 'Agosto 2024'
  },
  {
    id: 'art-4',
    title: 'Consumo de APIs REST: TanStack Query vs toSignal vs useFetch',
    tag: 'Frontend',
    category: 'frontend',
    targetTab: 'react',
    summary: 'A anatomia do gerenciamento de estado assíncrono moderno nas 3 principais bibliotecas do mercado frontend.',
    readingTime: '4 min de leitura',
    date: 'Agosto 2024'
  },
  {
    id: 'art-5',
    title: 'Go com Fiber e GORM: Construindo APIs que suportam 50k req/s',
    tag: 'Backend',
    category: 'backend',
    targetTab: 'go',
    summary: 'Por que o ecossistema Go se tornou o padrão ouro para microsserviços de baixa latência e consumo mínimo de memória RAM.',
    readingTime: '6 min de leitura',
    date: 'Julho 2024'
  },
  {
    id: 'art-6',
    title: 'Índices e Paginação por Cursor que salvam sua query em produção',
    tag: 'Banco de Dados',
    category: 'database',
    targetTab: 'relational',
    summary: 'Como evitar o custo catastrófico de OFFSET 500000 e como ler o EXPLAIN ANALYZE para identificar gargalos de I/O.',
    readingTime: '8 min de leitura',
    date: 'Julho 2024'
  }
];
