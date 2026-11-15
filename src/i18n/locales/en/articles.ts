import { ArticlesLocale } from '../../types.ts';
import { ArticleAuthor } from '../../../types.ts';

const AUTHOR_EN: ArticleAuthor = {
  name: 'Eduardo Lessa',
  role: 'Full-Stack Software Engineer & Distributed Architecture Specialist',
  bio: 'Over 10 years of experience building high-scale systems, resilient APIs, and high-performance frontend interfaces. Passionate about teaching through pragmatic technical contrast.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com'
};

const articlesEn: ArticlesLocale = {
  articles: [
    {
      id: 'signals-reactivity',
      slug: 'signals-o-futuro-da-reatividade-frontend',
      title: 'Signals: The Future of Reactivity in Angular 17+, Vue 3, and React 19',
      subtitle: 'Why fine-grained reactive dependency graphs are replacing coarse Virtual DOM diffing and legacy change detection.',
      category: 'frontend',
      tag: 'Frontend • Reactivity',
      targetTab: 'angular',
      targetPage: 'frontend',
      readingTime: '8 min read',
      date: 'September 2024',
      updatedAt: 'Updated for Angular 18 & React 19',
      author: AUTHOR_EN,
      summary: 'An in-depth architectural breakdown of how Angular and Vue embraced native reactive Signals with dependency graphs, while React doubles down on functional re-rendering plus the React Compiler.',
      introduction: [
        'For nearly a decade, the frontend ecosystem ran under the hegemony of the Virtual DOM (VDOM). Whenever application state changed, the framework re-executed component functions, constructed a new in-memory virtual tree, and ran a diffing algorithm to patch only the minimal browser DOM mutations.',
        'However, as web applications evolved into dense enterprise platforms with hundreds of live widgets, re-evaluating entire component subtrees started creating measurable CPU spikes and garbage collection overhead.',
        'That bottleneck fueled the renaissance of Signal-based reactivity. Far from a passing trend, Signals shift updates from component-level re-renders to surgical updates tied directly to the exact property that changed.'
      ],
      contextProblem: {
        title: 'The Cascading Re-Render Problem at Scale',
        description: 'In complex systems such as financial dashboards, real-time trading feeds, and 10,000-row grids, a top-level state update can trigger unnecessary cascading re-renders across unrelated subtrees.',
        symptoms: [
          'Noticeable frame drops (jank) when typing inside large form trees.',
          'Proliferation of manual useMemo, useCallback, and React.memo micro-optimizations.',
          'Difficulty tracing which state mutation caused a distant DOM subtree to update.',
          'Elevated heap pressure from discarded intermediate VDOM trees.'
        ]
      },
      benchmarks: {
        title: 'Granular Update Metrics (10,000 DOM Nodes)',
        description: 'UI update latency and heap memory footprint when updating a single field inside a 10,000-record list.',
        data: [
          {
            metric: 'DOM Mutation Time (ms)',
            stackA: 'Angular 17+ (Signals): 1.8ms',
            stackB: 'Vue 3.4 (Reactivity Core): 2.1ms',
            stackC: 'React 18 (Standard useState): 14.6ms',
            observation: 'Signals update only the exact bound text node without re-running parent components.'
          },
          {
            metric: 'Heap Memory Usage (MB)',
            stackA: 'Angular 17+: 28 MB',
            stackB: 'Vue 3.4: 24 MB',
            stackC: 'React 18: 46 MB',
            observation: 'Eliminating intermediate VDOM allocations reduces pressure on the V8 Garbage Collector.'
          },
          {
            metric: 'Optimization Ergonomics',
            stackA: 'Automatic via signal() and computed()',
            stackB: 'Built-in via ref() and computed()',
            stackC: 'Requires manual memoization or React Compiler',
            observation: 'Signals remove fragile manual dependency arrays from day-to-day application code.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: 'Angular 17+ (Native Signals)',
          pros: [
            'Gradual elimination of historical Zone.js dependency and monkey-patching overhead.',
            'Seamless RxJS interoperability via toSignal() and toObservable().',
            'Strict typing and standalone API ergonomics via input() and model().'
          ],
          cons: [
            'Learning curve for teams accustomed to ChangeDetectionStrategy.OnPush.',
            'Requires migrating legacy property bindings to signal invocation syntax name().'
          ],
          whenToChoose: 'Large enterprise codebases with strict team governance and end-to-end TypeScript contracts.'
        },
        {
          title: 'Vue 3.4+ (Composition API & Ref)',
          pros: [
            'Fine-grained reactivity baked into Vue 3 core from day one.',
            'Exceptionally clean authoring experience with <script setup>.',
            'Automatic dependency tracking during template evaluation.'
          ],
          cons: [
            'Requires accessing .value in TypeScript/JavaScript logic (though unwrapped in templates).'
          ],
          whenToChoose: 'Teams seeking maximum velocity, syntactic clarity, and out-of-the-box runtime speed.'
        },
        {
          title: 'React 18/19 (Hooks & Functional Model)',
          pros: [
            'Unmatched third-party component and tooling ecosystem.',
            'Pure JavaScript mental model (UI = f(state)) without reactive wrapper boxes.',
            'First-class support for React Server Components (RSC) and streaming SSR.'
          ],
          cons: [
            'Requires discipline or compiler tooling to avoid cascading re-renders.',
            'Strict Hook rules prohibit conditional or nested Hook invocations.'
          ],
          whenToChoose: 'When ecosystem breadth, hiring availability, and Server Components are top priorities.'
        }
      ],
      codeComparison: {
        title: 'Practical Example: Reactive Counter with Derived State',
        description: 'Compare declaring primitive reactive state and derived computed values across all three frameworks:',
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
      <p>Count: {{ count() }}</p>
      <p>Double: {{ doubleCount() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  \`
})
export class CounterComponent {
  readonly count = signal(0);
  readonly doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}`,
            explanation: 'Angular builds a fine-grained dependency graph so only template bindings reading doubleCount() update.'
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
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>`,
            explanation: 'Vue tracks reads of count.value automatically inside computed() without explicit dependency arrays.'
          },
          {
            label: 'React (Hooks)',
            language: 'tsx',
            filename: 'Counter.tsx',
            code: `import React, { useState, useMemo } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <div className="card">
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`,
            explanation: 'Every update to count re-executes the Counter component body, using useMemo to guard expensive calculations.'
          }
        ]
      },
      pitfalls: [
        'Never destructure reactive objects in Vue or Angular without dedicated utilities like toRefs(), or you break reactivity tracking.',
        'Avoid side effects inside computed() derivations; reserve effect() or watchEffect() strictly for external synchronization.',
        'In React, never store derivable values in separate useState hooks; compute them inline or with useMemo.'
      ],
      conclusion: [
        'Industry convergence toward fine-grained reactivity proves surgical DOM updates are essential for responsive interfaces.',
        'Angular leaped ahead with native Signals in v17+, Vue continues refining the cleanest reactive core, and React automates memoization via the React Compiler.'
      ],
      relatedArticleIds: ['rest-api-cache', 'net8-vs-fastapi']
    },
    {
      id: 'net8-vs-fastapi',
      slug: 'net8-minimal-apis-vs-python-fastapi',
      title: '.NET 8 Minimal APIs vs Python FastAPI: Productivity and Throughput Analysis',
      subtitle: 'A low-level comparison covering request latency, async I/O, strict validation, and high-concurrency scalability.',
      category: 'backend',
      tag: 'Backend • REST APIs',
      targetTab: 'dotnet',
      targetPage: 'backend',
      readingTime: '9 min read',
      date: 'September 2024',
      updatedAt: 'Reviewed for .NET 8 LTS & Python 3.12',
      author: AUTHOR_EN,
      summary: 'Side-by-side analysis of C# Minimal APIs versus modern Python FastAPI across raw network throughput, OpenAPI generation, and strict type validation.',
      introduction: [
        'API engineering used to split cleanly into two camps: rapid scripting productivity with Python/Node.js versus compiled raw speed and static guarantees with C#/Java.',
        '.NET 8 Minimal APIs stripped away legacy controller boilerplate so routes can be declared concisely without sacrificing Kestrel performance.',
        'Meanwhile, FastAPI transformed Python APIs using native AsyncIO, Starlette, and Rust-powered Pydantic v2 validation.'
      ],
      contextProblem: {
        title: 'The Dilemma: Delivery Speed vs Cloud Compute Cost',
        description: 'Engineering teams must ship microservices fast without incurring runaway cloud compute bills from inefficient runtimes.',
        symptoms: [
          'Throughput stalls under CPU saturation or GIL contention in Python workers.',
          'Slow container cold starts in Kubernetes autoscaling or serverless hosts.',
          'Production serialization bugs slipping past loose dynamic payloads.',
          'Over-provisioned container clusters compensating for framework overhead.'
        ]
      },
      benchmarks: {
        title: 'Load Benchmark (k6 - 5,000 Concurrent VUs)',
        description: 'Stress test on c6i.xlarge Linux (4 vCPUs, 8 GB RAM) serving GET /api/users with JSON serialization and relational lookup.',
        data: [
          {
            metric: 'Average Throughput (RPS)',
            stackA: '.NET 8 (Kestrel + Minimal APIs): 68,400 RPS',
            stackB: 'Python 3.12 (FastAPI + Uvicorn): 14,800 RPS',
            observation: '.NET JIT optimizations and zero-allocation Span<T> pipelines yield nearly 5x higher RPS.'
          },
          {
            metric: 'p99 Latency under Peak Load',
            stackA: '.NET 8: 6.2ms',
            stackB: 'FastAPI: 38.4ms',
            observation: 'Without a Global Interpreter Lock (GIL), .NET saturates all CPU cores with true multithreading.'
          },
          {
            metric: 'Average RAM Footprint',
            stackA: '.NET 8: ~110 MB',
            stackB: 'FastAPI (4 workers): ~185 MB',
            observation: '.NET 8 maintains an impressively compact memory profile under heavy concurrency.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: '.NET 8 (C# Minimal APIs)',
          pros: [
            'Top-tier TechEmpower throughput and ultra-low GC pause latency.',
            'Compile-time type safety catching contract mismatches early.',
            'Mature OpenTelemetry profiling and diagnostics out of the box.'
          ],
          cons: [
            'Compiled deployment artifacts are larger than lightweight scripts.',
            'Steeper initial curve for developers unfamiliar with C# generics and DI.'
          ],
          whenToChoose: 'High-traffic enterprise APIs, financial ledgers, and latency-sensitive microservices where infrastructure efficiency matters.'
        },
        {
          title: 'Python 3.12 (FastAPI + Pydantic v2)',
          pros: [
            'Unmatched prototyping speed and readability.',
            'Automatic interactive Swagger/OpenAPI schemas zero-config.',
            'Direct native integration with AI/ML tooling (PyTorch, OpenAI SDK, LangChain).'
          ],
          cons: [
            'CPU-bound tasks are constrained by Python’s GIL unless offloaded.',
            'Higher tail latency under extreme concurrent I/O compared to compiled binaries.'
          ],
          whenToChoose: 'AI/ML inference services, data pipelines, rapid MVPs, and analytics APIs where Python libraries dominate.'
        }
      ],
      codeComparison: {
        title: 'Syntax Comparison: Typed DTO Endpoint',
        description: 'Compare how both stacks validate a typed request body and inject database sessions:',
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
        return Results.BadRequest(new { error = "Email is required" });

    var user = new User { Name = dto.Name, Email = dto.Email };
    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/api/users/{user.Id}", user);
});

app.Run();

public record CreateUserDto(string Name, string Email);`,
            explanation: 'C# records give concise immutable DTOs while Minimal APIs inject AppDbContext directly into the route delegate.'
          },
          {
            label: 'Python (main.py)',
            language: 'python',
            filename: 'main.py',
            code: `from fastapi import FastAPI, Depends, status
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
    await db.commit()
    await db.refresh(db_user)
    return db_user`,
            explanation: 'Rust-backed Pydantic v2 validates email syntax automatically and returns structured 422 JSON errors.'
          }
        ]
      },
      pitfalls: [
        'In FastAPI, never call blocking synchronous I/O inside async def handlers without offloading to a threadpool.',
        'In .NET, avoid registering heavy transient services inside hot per-request paths.',
        'Always enforce database connection pooling (e.g., PgBouncer or Npgsql pooling) on both stacks.'
      ],
      conclusion: [
        'Both .NET 8 and FastAPI represent modern best-in-class API engineering.',
        'Pick .NET 8 for vertical scalability and minimal cloud spend; pick FastAPI for rapid iteration and AI/Data ecosystems.'
      ],
      relatedArticleIds: ['go-microservices', 'sql-vs-nosql']
    },
    {
      id: 'sql-vs-nosql',
      slug: 'quando-trocar-sql-por-nosql-guia-pragmatico',
      title: 'When to Switch from SQL to NoSQL? The Pragmatic Architecture Guide',
      subtitle: 'Debunking the myth that NoSQL is always faster, and mapping where MongoDB, Redis, Cassandra, and PostgreSQL truly win.',
      category: 'database',
      tag: 'Databases • Architecture',
      targetTab: 'nosql',
      targetPage: 'database',
      readingTime: '10 min read',
      date: 'August 2024',
      updatedAt: 'Updated for PostgreSQL 16 & MongoDB 7',
      author: AUTHOR_EN,
      summary: 'A practical framework for tech leads deciding between ACID relational guarantees and horizontal NoSQL scalability.',
      introduction: [
        'For years, hype suggested relational databases were obsolete. Teams prematurely replaced battle-tested SQL engines with document stores, only to rediscover the pain of eventual consistency and application-level joins.',
        'Modern data engineering recognizes there is no silver bullet—only CAP theorem trade-offs and concrete access patterns.'
      ],
      contextProblem: {
        title: 'The Binary SQL vs NoSQL Fallacy',
        description: 'Systems stumble when teams force a single database engine to serve transactional, analytical, and sub-millisecond cache workloads simultaneously.',
        symptoms: [
          'Financial race conditions caused by missing ACID transactions.',
          'Slow management reporting across denormalized key-value stores.',
          'Bloated storage footprints from duplicating nested documents.',
          'Silently orphaned references due to absent foreign keys.'
        ]
      },
      benchmarks: {
        title: 'Real-World Workload Matrix',
        description: 'Technical fit across common enterprise data access patterns:',
        data: [
          {
            metric: 'Financial Ledgers & Payments',
            stackA: 'PostgreSQL / MySQL: Excellent (Strict ACID)',
            stackB: 'MongoDB: Acceptable (Multi-doc transactions add latency)',
            stackC: 'Cassandra: Unsuitable (Eventual consistency)',
            observation: 'Relational engines remain irreplaceable where zero lost cents is mandatory.'
          },
          {
            metric: 'Sessions & Sub-ms Cache',
            stackA: 'PostgreSQL: Moderate (WAL disk overhead)',
            stackB: 'Redis: Ideal (100% in-memory RAM structures)',
            stackC: 'MongoDB: Overkill for ephemeral cache',
            observation: 'Redis delivers <0.5ms latency at hundreds of thousands of ops/sec.'
          },
          {
            metric: 'IoT Telemetry & Write-Heavy Streams',
            stackA: 'PostgreSQL: Requires TimescaleDB/partitioning',
            stackB: 'Cassandra / ScyllaDB: Excellent (LSM-Tree architecture)',
            stackC: 'DynamoDB: Excellent with On-Demand capacity',
            observation: 'Cassandra excels at distributed multi-region write ingestion.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: 'PostgreSQL (The Relational Swiss Army Knife)',
          pros: [
            'Handles both strict normalized tables and indexed JSONB documents via GIN.',
            'Rock-solid ACID compliance and transactional safety.',
            'Rich extensions including PostGIS and pgvector for AI embeddings.'
          ],
          cons: [
            'Horizontal write sharding is operationally complex compared to NoSQL.'
          ],
          whenToChoose: 'Default choice for 90% of new applications unless specialized scale dictates otherwise.'
        },
        {
          title: 'Redis (In-Memory Real-Time Layer)',
          pros: [
            'Unmatched sub-millisecond response times.',
            'Purpose-built Sorted Sets, Hashes, Streams, and automatic TTL.',
            'Ideal for rate limiting, distributed locks, and hot session state.'
          ],
          cons: [
            'RAM-bound cost per gigabyte is substantially higher than SSD storage.'
          ],
          whenToChoose: 'As a secondary speed/caching tier paired with a durable primary database.'
        },
        {
          title: 'MongoDB (Flexible Document Store)',
          pros: [
            'Natural JSON/BSON representation for polymorphic schemas.',
            'Great fit for diverse e-commerce product catalogs and CMS payloads.',
            'Mature horizontal sharding.'
          ],
          cons: [
            'Heavy $lookup joins degrade latency fast.',
            'Denormalization multiplies update fan-out.'
          ],
          whenToChoose: 'Heterogeneous catalogs, content hubs, and document-centric event logs.'
        }
      ],
      pitfalls: [
        'Never pick NoSQL merely to avoid writing SQL migrations—schemaless databases push validation burden into your application code.',
        'Avoid unbounded denormalization where renaming one user requires updating 500,000 order documents.',
        'Adopt polyglot persistence: PostgreSQL as source of truth plus Redis for hot caching.'
      ],
      conclusion: [
        'Choosing between SQL and NoSQL means matching storage semantics to access patterns, not chasing trends.',
        'Start with PostgreSQL and layer Redis or specialized NoSQL stores only when measured bottlenecks justify them.'
      ],
      relatedArticleIds: ['indices-and-pagination', 'signals-reactivity']
    },
    {
      id: 'rest-api-cache',
      slug: 'consumo-de-apis-rest-e-cache-assincrono',
      title: 'REST API Consumption & Async Caching: TanStack Query vs toSignal vs useFetch',
      subtitle: 'Managing server state, request deduplication, and resilient client caching in React, Angular, and Vue.',
      category: 'frontend',
      tag: 'Frontend • Network',
      targetTab: 'react',
      targetPage: 'frontend',
      readingTime: '7 min read',
      date: 'August 2024',
      updatedAt: 'Updated for TanStack Query v5',
      author: AUTHOR_EN,
      summary: 'How modern frontends separate server state from UI state to avoid duplicate API requests and adopt stale-while-revalidate.',
      introduction: [
        'Frontend engineers long stuffed fetched API payloads into global client stores like Redux, treating remote asynchronous snapshots as local state.',
        'Dedicated server-state libraries such as TanStack Query handle deduplication, retries, background refetching, and cache invalidation automatically.'
      ],
      contextProblem: {
        title: 'Uncoordinated Async Fetching',
        description: 'Without shared request caching, independent widgets fire redundant calls to the exact same backend endpoints.',
        symptoms: [
          'Multiple components requesting /api/me concurrently on initial render.',
          'UI flickers when navigating between cached views.',
          'Manual boilerplate repeating isLoading, isError, and data flags.'
        ]
      },
      keyTradeoffs: [
        {
          title: 'React with TanStack Query v5',
          pros: [
            'Automatic in-flight request deduplication.',
            'Instant cached rendering via stale-while-revalidate.',
            'Optimistic UI updates and infinite pagination built in.'
          ],
          cons: [
            'Adds ~12 KB min+gzip external library weight.'
          ],
          whenToChoose: 'Nearly mandatory for production React apps consuming REST or GraphQL APIs.'
        },
        {
          title: 'Angular with HttpClient + toSignal',
          pros: [
            'Native integration with Angular DI and HTTP interceptors.',
            'Clean RxJS-to-Signal bridge for templates.',
            'Zero external dependencies required.'
          ],
          cons: [
            'Advanced cache invalidation requires custom interceptors or community adapters.'
          ],
          whenToChoose: 'Enterprise Angular platforms standardized on built-in framework primitives.'
        }
      ],
      pitfalls: [
        'Never confuse staleTime with gcTime in TanStack Query: staleTime controls freshness while gcTime controls memory eviction.',
        'Include every filter and pagination parameter inside queryKey arrays.'
      ],
      conclusion: [
        'Separating server state from UI state transforms perceived responsiveness across modern SPAs.'
      ],
      relatedArticleIds: ['signals-reactivity', 'net8-vs-fastapi']
    },
    {
      id: 'go-microservices',
      slug: 'go-fiber-gorm-microsservicos-alta-concorrencia',
      title: 'Go with Fiber & GORM vs Node.js: High-Concurrency Microservices',
      subtitle: 'How lightweight Goroutines handle tens of thousands of persistent connections on a fraction of the RAM.',
      category: 'backend',
      tag: 'Backend • Concurrency',
      targetTab: 'go',
      targetPage: 'backend',
      readingTime: '8 min read',
      date: 'July 2024',
      updatedAt: 'Tested with Go 1.22 & Fiber v2',
      author: AUTHOR_EN,
      summary: 'Why high-throughput teams migrate I/O gateways and real-time services to Go with Fiber and GORM.',
      introduction: [
        'Node.js popularized non-blocking event-loop I/O, yet single-threaded CPU work and V8 memory overhead show limits at extreme connection concurrency.',
        'Go solves this natively with multiplexed ~2 KB Goroutines and static single-binary compilation.'
      ],
      contextProblem: {
        title: 'Scaling Concurrent Connections Without RAM Bloat',
        description: 'Sustaining tens of thousands of concurrent WebSockets or HTTP streams without triggering Kubernetes OOMKills.',
        symptoms: [
          'Container OOM restarts during traffic bursts.',
          'Latency spikes when synchronous handlers block the Node event loop.',
          'Verbose runtime crashes from loosely typed payloads.'
        ]
      },
      keyTradeoffs: [
        {
          title: 'Go (Fiber + GORM / pgx)',
          pros: [
            '~2 KB Goroutine stacks vs ~1 MB OS threads.',
            'Tiny ~15 MB Alpine/scratch Docker containers.',
            'Sub-15ms startup ideal for rapid Kubernetes autoscaling.'
          ],
          cons: [
            'Explicit error checking (if err != nil) adds repetition.',
            'Smaller ecosystem than npm for niche business integrations.'
          ],
          whenToChoose: 'API gateways, streaming brokers, telemetry collectors, and high-concurrency backend services.'
        }
      ],
      pitfalls: [
        'Always pass context.Context to child Goroutines to prevent silent leaks when clients disconnect.',
        'Run CI suites with go test -race to catch shared-memory race conditions early.'
      ],
      conclusion: [
        'Go’s simplicity and concurrency primitives make it one of the safest choices for cloud-native microservices.'
      ],
      relatedArticleIds: ['net8-vs-fastapi', 'sql-vs-nosql']
    },
    {
      id: 'indices-and-pagination',
      slug: 'indices-estrategicos-e-paginacao-por-cursor',
      title: 'Strategic Indexes & Cursor Pagination: Eliminating Relational Bottlenecks',
      subtitle: 'Why OFFSET 500000 crushes production databases and how Keyset Pagination guarantees O(1) lookups.',
      category: 'database',
      tag: 'Databases • Performance',
      targetTab: 'relational',
      targetPage: 'database',
      readingTime: '9 min read',
      date: 'July 2024',
      updatedAt: 'PostgreSQL, MySQL & SQL Server compatible',
      author: AUTHOR_EN,
      summary: 'Practical guide to reading EXPLAIN ANALYZE plans and replacing deep OFFSET pagination with Keyset cursors.',
      introduction: [
        'In development databases with a few hundred rows, any SQL query looks instant. At 10 million rows in production, missing indexes and OFFSET scans lock connection pools.',
        'Understanding B-Tree indexes and Keyset Pagination is essential for every backend and full-stack engineer.'
      ],
      contextProblem: {
        title: 'The Hidden Cost of OFFSET Inside Database Engines',
        description: 'OFFSET 500000 LIMIT 20 forces the engine to read, sort, and discard 500,000 rows on every request before returning 20.',
        symptoms: [
          'Deep pages load 10x slower than page 1.',
          'Sudden disk read IOPS spikes under pagination bots.',
          'Duplicate rows appearing as new records insert concurrently.'
        ]
      },
      keyTradeoffs: [
        {
          title: 'Cursor (Keyset) Pagination',
          pros: [
            'Constant O(1) index seek speed on page 1 or page 500,000.',
            'Resilient against concurrent inserts shifting offsets.'
          ],
          cons: [
            'Does not support jumping directly to arbitrary page #47 without scanning prior cursors.'
          ],
          whenToChoose: 'Infinite scroll feeds, mobile APIs, batch exports, and large audit tables.'
        }
      ],
      pitfalls: [
        'Never wrap indexed columns in functions inside WHERE clauses (e.g., LOWER(email)) unless using an expression index.',
        'Balance read indexes carefully—excessive indexes slow down INSERT/UPDATE throughput.'
      ],
      conclusion: [
        'A single well-designed B-Tree index paired with Keyset Pagination often speeds up systems more than weeks of application refactoring.'
      ],
      relatedArticleIds: ['sql-vs-nosql', 'net8-vs-fastapi']
    },
    {
      id: 'rabbitmq-vs-kafka-event-driven',
      slug: 'rabbitmq-vs-apache-kafka-mensageria-sistemas-distribuidos',
      title: 'RabbitMQ vs Apache Kafka: Architectural Choices in Event-Driven Systems',
      subtitle: 'When to adopt AMQP message queues with rich routing versus an immutable distributed commit log.',
      category: 'backend',
      tag: 'Backend • Distributed Messaging',
      targetTab: 'dotnet',
      targetPage: 'backend',
      readingTime: '11 min read',
      date: 'November 2024',
      updatedAt: 'Reviewed for RabbitMQ 3.13 & Apache Kafka 3.7 (KRaft)',
      author: AUTHOR_EN,
      summary: 'Comparing Smart Broker / Dumb Consumer (RabbitMQ) against Dumb Broker / Smart Consumer immutable logs (Kafka), including Outbox Pattern, DLQs, and idempotency.',
      introduction: [
        'Decomposing monoliths via synchronous REST chains creates fragile cascading failures when downstream services stall.',
        'Event-Driven Architecture (EDA) decouples services asynchronously, raising an immediate choice: RabbitMQ or Apache Kafka?',
        'RabbitMQ acts as a smart AMQP router deleting messages after ACK, while Kafka is an immutable append-only distributed log supporting historical replay.'
      ],
      contextProblem: {
        title: 'Temporal Coupling and Silent Message Loss',
        description: 'Naive messaging setups ignore at-least-once semantics, causing duplicate charges, blocked poison-pill queues, and dual-write drift.',
        symptoms: [
          'Double-charged orders due to non-idempotent consumers.',
          'Poison messages crashing workers in endless retry loops without a Dead Letter Queue.',
          'Database commits succeeding while broker publishing fails silently.'
        ]
      },
      benchmarks: {
        title: '3-Node Cluster Throughput & Latency Benchmarks',
        description: 'Stress test on c6i.xlarge nodes publishing 1 KB persistent JSON payloads.',
        data: [
          {
            metric: 'Sustained Throughput (Msgs/sec)',
            stackA: 'RabbitMQ (Quorum Queues): ~38,000 msgs/s',
            stackB: 'Apache Kafka (linger.ms=5): ~420,000 msgs/s',
            stackC: 'Redis Streams: ~85,000 msgs/s',
            observation: 'Kafka achieves massive throughput via sequential disk I/O, Zero-Copy sendfile, and batching.'
          },
          {
            metric: 'Individual p99 Latency (ms)',
            stackA: 'RabbitMQ: 0.8ms (Sub-millisecond)',
            stackB: 'Apache Kafka: 7.4ms (Batch buffering)',
            stackC: 'Redis Streams: 0.4ms (In-Memory)',
            observation: 'RabbitMQ pushes messages immediately for real-time task dispatch.'
          },
          {
            metric: 'Routing Semantics',
            stackA: 'RabbitMQ: Direct, Topic, Fanout & Headers Exchanges',
            stackB: 'Apache Kafka: Partition Key hashing by Topic',
            stackC: 'Redis Streams: Simple stream keys & Consumer Groups',
            observation: 'RabbitMQ filters complex wildcard routing patterns at the broker layer.'
          },
          {
            metric: 'Retention & Historical Replay',
            stackA: 'RabbitMQ: Deleted immediately after ACK',
            stackB: 'Apache Kafka: Configurable retention with full offset replay',
            stackC: 'Redis Streams: Bounded by available RAM',
            observation: 'Kafka allows new consumers to replay months of events from offset 0.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: 'RabbitMQ (Erlang • AMQP & Quorum Queues)',
          pros: [
            'Flexible routing Exchanges decoupling publishers from queues.',
            'Sub-millisecond point-to-point dispatch.',
            'Native Dead Letter Exchanges (DLX), per-message TTL, and priority queues.'
          ],
          cons: [
            'Lower ceiling than Kafka at hundreds of thousands of msgs/sec.',
            'No native historical replay once messages are acknowledged.'
          ],
          whenToChoose: 'Enterprise microservices, payment workflows, background worker queues, and complex routing rules.'
        },
        {
          title: 'Apache Kafka (Distributed Append-Only Log)',
          pros: [
            'Scales to millions of events per second across partitioned clusters.',
            'Immutable retention enabling event sourcing and full audit replay.',
            'Strict ordering per Partition Key and KRaft mode without ZooKeeper.'
          ],
          cons: [
            'Higher operational complexity around partition sizing and rebalancing.',
            'No broker-side wildcard routing filters.'
          ],
          whenToChoose: 'High-volume ingestion pipelines, IoT telemetry, CDC (Debezium), Event Sourcing, and real-time analytics.'
        }
      ],
      codeComparison: {
        title: 'Outbox Pattern & Resilient Consumption with DLQ',
        description: 'Compare resilient retry/DLQ consumption in .NET MassTransit alongside idempotent Kafka publishing in Python:',
        snippets: [
          {
            label: '.NET 8 / C# (MassTransit + RabbitMQ)',
            language: 'csharp',
            filename: 'OrderConsumer.cs',
            code: `public class ProcessOrderConsumer : IConsumer<OrderPlacedEvent>
{
    private readonly ILogger<ProcessOrderConsumer> _logger;
    private readonly IPaymentGateway _payment;

    public ProcessOrderConsumer(ILogger<ProcessOrderConsumer> logger, IPaymentGateway payment)
    {
        _logger = logger;
        _payment = payment;
    }

    public async Task Consume(ConsumeContext<OrderPlacedEvent> context)
    {
        var message = context.Message;
        _logger.LogInformation("Processing Order: {OrderId}", message.OrderId);
        await _payment.ChargeAsync(message.OrderId, message.TotalAmount, context.CancellationToken);
    }
}`,
            explanation: 'MassTransit configures exponential retry and automatically routes poisoned payloads to _error DLQs.'
          },
          {
            label: 'Python / FastAPI (Confluent Kafka Outbox Producer)',
            language: 'python',
            filename: 'kafka_outbox_publisher.py',
            code: `import json
from confluent_kafka import Producer

conf = {
    'bootstrap.servers': 'localhost:9092',
    'acks': 'all',
    'enable.idempotence': True,
    'compression.type': 'snappy'
}

producer = Producer(conf)

def publish_order_event(order_id: str, payload: dict):
    producer.produce(
        topic='orders.events',
        key=str(order_id).encode('utf-8'),
        value=json.dumps(payload).encode('utf-8')
    )
    producer.poll(0)`,
            explanation: 'Using order_id as partition key guarantees strict per-order ordering while acks=all and idempotence prevent duplicates.'
          }
        ]
      },
      pitfalls: [
        'Never dual-write directly to DB and broker without the Transactional Outbox Pattern.',
        'Always attach Dead Letter Queues (DLQ) to RabbitMQ queues to isolate poison-pill messages.',
        'In Kafka, ordering is only guaranteed within a single partition.',
        'Every EDA consumer must be idempotent under at-least-once delivery.'
      ],
      conclusion: [
        'Choose RabbitMQ for transactional task queues and smart routing; choose Apache Kafka for immutable high-throughput event streams and replay.'
      ],
      relatedArticleIds: ['net8-vs-fastapi', 'go-microservices', 'sql-vs-nosql']
    }
  ]
};

export default articlesEn;
