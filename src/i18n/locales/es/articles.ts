import { ArticlesLocale } from '../../types.ts';
import { ArticleAuthor } from '../../../types.ts';

const AUTHOR_ES: ArticleAuthor = {
  name: 'Eduardo Lessa',
  role: 'Ingeniero de Software Full-Stack & Especialista en Arquitectura Distribuida',
  bio: 'Más de 10 años de experiencia construyendo sistemas de alta escala, APIs resilientes e interfaces frontend de alto rendimiento. Apasionado por enseñar mediante el contraste técnico pragmático.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com'
};

const articlesEs: ArticlesLocale = {
  articles: [
    {
      id: 'signals-reactivity',
      slug: 'signals-o-futuro-da-reatividade-frontend',
      title: 'Signals: El Futuro de la Reactividad en Angular 17+, Vue 3 y React 19',
      subtitle: 'Por qué los grafos de dependencia reactiva de granularidad fina están sustituyendo al Virtual DOM clásico.',
      category: 'frontend',
      tag: 'Frontend • Reactividad',
      targetTab: 'angular',
      targetPage: 'frontend',
      readingTime: '8 min de lectura',
      date: 'Septiembre 2024',
      updatedAt: 'Actualizado para Angular 18 y React 19',
      author: AUTHOR_ES,
      summary: 'Análisis profundo de cómo Angular y Vue adoptaron Signals nativos con grafos reactivos, mientras React refuerza el modelo funcional apoyado en React Compiler.',
      introduction: [
        'Durante casi una década, el desarrollo frontend operó bajo el Virtual DOM (VDOM). Cada cambio de estado volvía a ejecutar funciones de componentes y calculaba diferencias en memoria para actualizar el DOM real.',
        'A medida que las aplicaciones crecieron en densidad corporativa, re-evaluar árboles enteros comenzó a consumir valiosa CPU y memoria.',
        'En ese escenario resurgió la arquitectura basada en Signals: la reactividad pasa del nivel completo de componente al nodo exacto que cambió.'
      ],
      contextProblem: {
        title: 'El Exceso de Re-renderizados a Gran Escala',
        description: 'En paneles financieros o tablas de 10.000 filas, un cambio de estado superior puede desencadenar re-renderizados en cascada innecesarios.',
        symptoms: [
          'Caídas de fluidez (jank) al escribir en formularios extensos.',
          'Abuso manual de useMemo, useCallback y React.memo por todo el código.',
          'Dificultad para rastrear qué mutación disparó la actualización de un nodo.',
          'Presión en el Garbage Collector por árboles VDOM intermedios.'
        ]
      },
      benchmarks: {
        title: 'Métricas de Actualización Granular (10.000 nodos DOM)',
        description: 'Comparativa de latencia de interfaz y memoria al actualizar 1 campo dentro de 10.000 registros.',
        data: [
          {
            metric: 'Tiempo de Mutación en DOM (ms)',
            stackA: 'Angular 17+ (Signals): 1.8ms',
            stackB: 'Vue 3.4 (Reactivity Core): 2.1ms',
            stackC: 'React 18 (useState estándar): 14.6ms',
            observation: 'Los Signals actualizan solo el nodo de texto enlazado sin re-evaluar el componente padre.'
          },
          {
            metric: 'Uso de Memoria Heap (MB)',
            stackA: 'Angular 17+: 28 MB',
            stackB: 'Vue 3.4: 24 MB',
            stackC: 'React 18: 46 MB',
            observation: 'Evitar nodos VDOM intermedios reduce el trabajo del Garbage Collector.'
          },
          {
            metric: 'Complejidad de Optimización',
            stackA: 'Automática con signal() y computed()',
            stackB: 'Nativa con ref() y computed()',
            stackC: 'Requiere memoización manual o React Compiler',
            observation: 'Los Signals eliminan arrays de dependencias propensos a errores sutiles.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: 'Angular 17+ (Signals Nativos)',
          pros: [
            'Eliminación progresiva de Zone.js y su sobrecarga.',
            'Interoperabilidad directa con RxJS vía toSignal() y toObservable().',
            'Tipado estricto con input() y model() standalone.'
          ],
          cons: [
            'Curva de adaptación para equipos acostumbrados a OnPush clásico.',
            'Migración de bindings en plantillas a llamadas nombreSignal().'
          ],
          whenToChoose: 'Aplicaciones empresariales de gran tamaño con alta gobernanza y tipado estricto.'
        },
        {
          title: 'Vue 3.4+ (Composition API & Ref)',
          pros: [
            'Reactividad fina integrada desde el diseño original de Vue 3.',
            'Sintaxis muy limpia con <script setup>.',
            'Seguimiento automático de dependencias.'
          ],
          cons: [
            'Requiere acceder a .value dentro de bloques script TypeScript/JS.'
          ],
          whenToChoose: 'Proyectos que buscan máximo equilibrio entre velocidad de desarrollo y rendimiento.'
        },
        {
          title: 'React 18/19 (Hooks & Modelo Funcional)',
          pros: [
            'El mayor ecosistema de librerías del mundo.',
            'Modelo mental puro UI = f(state).',
            'Gran soporte para React Server Components y streaming SSR.'
          ],
          cons: [
            'Exige disciplina o compilador para evitar cascadas de renders.',
            'Reglas estrictas de orden en los Hooks.'
          ],
          whenToChoose: 'Cuando el ecosistema de terceros y Server Components son prioritarios.'
        }
      ],
      codeComparison: {
        title: 'Ejemplo Práctico: Contador Reactivo con Valor Derivado',
        description: 'Observa la declaración de estado primitivo y valor computado en las 3 sintaxis:',
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
      <p>Conteo: {{ count() }}</p>
      <p>Doble: {{ doubleCount() }}</p>
      <button (click)="increment()">Incrementar</button>
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
            explanation: 'Angular crea un grafo reactivo para actualizar solo los enlaces afectados en la plantilla.'
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
    <p>Conteo: {{ count }}</p>
    <p>Doble: {{ doubleCount }}</p>
    <button @click="increment">Incrementar</button>
  </div>
</template>`,
            explanation: 'Vue registra automáticamente la dependencia hacia count.value durante el cálculo.'
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
      <p>Conteo: {count}</p>
      <p>Doble: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </div>
  );
}`,
            explanation: 'Cada cambio vuelve a ejecutar la función Counter, usando useMemo para proteger cálculos.'
          }
        ]
      },
      pitfalls: [
        'No desestructures propiedades reactivas en Vue sin utilidades como toRefs().',
        'Evita efectos secundarios dentro de computed(); usa effect() o watchEffect().',
        'En React, no guardes estado derivado en useState.'
      ],
      conclusion: [
        'La convergencia hacia Signals demuestra que las mutaciones quirúrgicas en el DOM son el estándar moderno de rendimiento.'
      ],
      relatedArticleIds: ['rest-api-cache', 'net8-vs-fastapi']
    },
    {
      id: 'net8-vs-fastapi',
      slug: 'net8-minimal-apis-vs-python-fastapi',
      title: 'Minimal APIs en .NET 8 vs FastAPI en Python: Productividad y Throughput',
      subtitle: 'Comparativa de bajo nivel en latencia, I/O asíncrono, validación de tipos y concurrencia.',
      category: 'backend',
      tag: 'Backend • APIs REST',
      targetTab: 'dotnet',
      targetPage: 'backend',
      readingTime: '9 min de lectura',
      date: 'Septiembre 2024',
      updatedAt: 'Revisado para .NET 8 LTS y Python 3.12',
      author: AUTHOR_ES,
      summary: 'Comparamos C# con Minimal APIs frente a Python FastAPI midiendo throughput real, OpenAPI automático y validación de esquemas.',
      introduction: [
        'Durante años el desarrollo backend se dividió entre la agilidad dinámica de Python/Node.js y el rendimiento compilado de C#/Java.',
        '.NET 8 Minimal APIs eliminó el código repetitivo sin sacrificar la velocidad de Kestrel.',
        'En paralelo, FastAPI revolucionó Python combinando AsyncIO con Pydantic v2 escrito en Rust.'
      ],
      contextProblem: {
        title: 'Velocidad de Entrega vs Costo de Infraestructura',
        description: 'Los equipos necesitan lanzar microservicios rápido sin disparar los costos de nube por baja eficiencia.',
        symptoms: [
          'Bloqueos por el GIL de Python bajo carga intensiva de CPU.',
          'Cold starts lentos en contenedores o funciones serverless.',
          'Errores de formato en producción sin validación estricta.'
        ]
      },
      benchmarks: {
        title: 'Benchmark de Carga Real (k6 - 5.000 Usuarios Simultáneos)',
        description: 'Prueba en Linux c6i.xlarge (4 vCPUs, 8 GB RAM) ejecutando GET /api/users con JSON y consulta SQL.',
        data: [
          {
            metric: 'Throughput Medio (RPS)',
            stackA: '.NET 8 (Kestrel + Minimal APIs): 68.400 RPS',
            stackB: 'Python 3.12 (FastAPI + Uvicorn): 14.800 RPS',
            observation: 'El JIT de .NET 8 y Span<T> entregan casi 5x más throughput.'
          },
          {
            metric: 'Latencia p99 bajo carga',
            stackA: '.NET 8: 6.2ms',
            stackB: 'FastAPI: 38.4ms',
            observation: 'Sin GIL, .NET aprovecha todos los núcleos de CPU con multihilo real.'
          },
          {
            metric: 'Consumo de RAM',
            stackA: '.NET 8: ~110 MB',
            stackB: 'FastAPI (4 workers): ~185 MB',
            observation: '.NET 8 mantiene un consumo de memoria muy contenido.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: '.NET 8 (C# Minimal APIs)',
          pros: [
            'Rendimiento líder en TechEmpower.',
            'Tipado estático en compilación.',
            'Gran soporte de telemetría con OpenTelemetry.'
          ],
          cons: [
            'Binarios más pesados que scripts simples.',
            'Mayor curva inicial en genéricos e inyección de dependencias.'
          ],
          whenToChoose: 'Microservicios corporativos de alto tráfico, pagos y servicios críticos.'
        },
        {
          title: 'Python 3.12 (FastAPI + Pydantic v2)',
          pros: [
            'Prototipado ultrarrápido.',
            'Documentación OpenAPI/Swagger generada automáticamente.',
            'Integración natural con Inteligencia Artificial y Ciencia de Datos.'
          ],
          cons: [
            'Limitado por el GIL en cargas intensivas de CPU.',
            'Mayor latencia en colas masivas frente a binarios compilados.'
          ],
          whenToChoose: 'Servicios de IA/ML, MVPs ágiles y APIs de datos.'
        }
      ],
      codeComparison: {
        title: 'Comparativa Sintáctica: Endpoint con Validación de DTO',
        description: 'Cómo ambas plataformas declaran contratos tipados e inyectan el acceso a datos:',
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
        return Results.BadRequest(new { error = "Correo obligatorio" });

    var user = new User { Name = dto.Name, Email = dto.Email };
    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/api/users/{user.Id}", user);
});

app.Run();

public record CreateUserDto(string Name, string Email);`,
            explanation: 'Los records en C# aportan inmutabilidad concisa e inyección directa en la ruta.'
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
            explanation: 'Pydantic v2 valida correos automáticamente y devuelve errores 422 estandarizados.'
          }
        ]
      },
      pitfalls: [
        'En FastAPI, nunca ejecutes I/O bloqueante dentro de funciones async def.',
        'Usa siempre pooling de conexiones en base de datos en ambas tecnologías.'
      ],
      conclusion: [
        'Elige .NET 8 por escala vertical y eficiencia en la nube; elige FastAPI por rapidez e integración con IA.'
      ],
      relatedArticleIds: ['go-microservices', 'sql-vs-nosql']
    },
    {
      id: 'sql-vs-nosql',
      slug: 'quando-trocar-sql-por-nosql-guia-pragmatico',
      title: '¿Cuándo Cambiar SQL por NoSQL? Guía Pragmática de Arquitectura',
      subtitle: 'Desmontando mitos y mostrando dónde brillan PostgreSQL, Redis, MongoDB y Cassandra.',
      category: 'database',
      tag: 'Bases de Datos • Arquitectura',
      targetTab: 'nosql',
      targetPage: 'database',
      readingTime: '10 min de lectura',
      date: 'Agosto 2024',
      updatedAt: 'Revisado para PostgreSQL 16 y MongoDB 7',
      author: AUTHOR_ES,
      summary: 'Guía práctica para elegir entre consistencia ACID relacional y escalabilidad horizontal NoSQL sin caer en modas.',
      introduction: [
        'Durante la última década muchos equipos abandonaron SQL prematuramente por modas NoSQL, sufriendo luego inconsistencias eventuales y joins en aplicación.',
        'No existe bala de plata: todo se reduce al Teorema CAP y al patrón real de lectura y escritura.'
      ],
      contextProblem: {
        title: 'La Falacia Binaria SQL vs NoSQL',
        description: 'Forzar una única tecnología para transacciones, caché y telemetría suele acabar en cuellos de botella.',
        symptoms: [
          'Inconsistencias financieras sin transacciones ACID.',
          'Reportes lentos en bases clave-valor.',
          'Duplicación masiva de documentos difíciles de mantener.'
        ]
      },
      benchmarks: {
        title: 'Matriz de Casos de Uso Reales',
        description: 'Evaluación por patrón de acceso corporativo:',
        data: [
          {
            metric: 'Transacciones Financieras',
            stackA: 'PostgreSQL / MySQL: Excelente (ACID estricto)',
            stackB: 'MongoDB: Aceptable (mayor latencia multi-doc)',
            stackC: 'Cassandra: Inadecuado',
            observation: 'Los motores relacionales son insustituibles en pagos y contabilidad.'
          },
          {
            metric: 'Sesiones y Caché (< 1ms)',
            stackA: 'PostgreSQL: Medio',
            stackB: 'Redis: Ideal (100% RAM)',
            stackC: 'MongoDB: Excesivo para caché efímera',
            observation: 'Redis responde por debajo de 0.5ms.'
          },
          {
            metric: 'Series Temporales / IoT',
            stackA: 'PostgreSQL: Requiere particionado o TimescaleDB',
            stackB: 'Cassandra / ScyllaDB: Excelente',
            stackC: 'DynamoDB: Excelente bajo demanda',
            observation: 'Cassandra escala linealmente en escritura distribuida.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: 'PostgreSQL (Navaja Suiza Relacional)',
          pros: [
            'Combina relaciones estrictas con documentos JSONB e índices GIN.',
            'Consistencia ACID completa.',
            'Extensiones líderes como PostGIS y pgvector.'
          ],
          cons: [
            'Sharding horizontal de escritura requiere arquitectura adicional.'
          ],
          whenToChoose: 'Opción recomendada para el 90% de las aplicaciones nuevas.'
        },
        {
          title: 'Redis (Velocidad en Memoria RAM)',
          pros: [
            'Latencia sub-milisegundo.',
            'Estructuras nativas con TTL automático.'
          ],
          cons: [
            'Costo por GB superior al almacenamiento en disco.'
          ],
          whenToChoose: 'Como capa secundaria de caché y velocidad.'
        },
        {
          title: 'MongoDB (Almacén Documental Flexible)',
          pros: [
            'Modelo JSON/BSON natural para catálogos variables.',
            'Sharding horizontal integrado.'
          ],
          cons: [
            'Joins ($lookup) costosos a gran escala.'
          ],
          whenToChoose: 'Catálogos polimórficos, CMS y registros flexibles.'
        }
      ],
      pitfalls: [
        'No adoptes NoSQL solo para evitar migraciones de esquema.',
        'Combina persistencia políglota: PostgreSQL como fuente de verdad + Redis como caché.'
      ],
      conclusion: [
        'Empieza con PostgreSQL e incorpora NoSQL únicamente donde la medición real lo justifique.'
      ],
      relatedArticleIds: ['indices-and-pagination', 'signals-reactivity']
    },
    {
      id: 'rest-api-cache',
      slug: 'consumo-de-apis-rest-e-cache-assincrono',
      title: 'Consumo de APIs REST y Caché Asíncrono: TanStack Query vs toSignal vs useFetch',
      subtitle: 'Gestión de estado del servidor, deduplicación y stale-while-revalidate en React, Angular y Vue.',
      category: 'frontend',
      tag: 'Frontend • Red',
      targetTab: 'react',
      targetPage: 'frontend',
      readingTime: '7 min de lectura',
      date: 'Agosto 2024',
      updatedAt: 'Actualizado para TanStack Query v5',
      author: AUTHOR_ES,
      summary: 'Cómo separar el estado del servidor del estado local evitando peticiones redundantes.',
      introduction: [
        'El estado remoto obtenido de APIs tiene ciclos propios de caché, reintentos y caducidad distintos del estado puramente visual.',
        'Herramientas como TanStack Query automatizan deduplicación y stale-while-revalidate.'
      ],
      contextProblem: {
        title: 'Estado Asíncrono Descoordinado',
        description: 'Sin caché compartida, múltiples componentes disparan llamadas repetidas al mismo endpoint.',
        symptoms: [
          'Tres widgets pidiendo /api/me simultáneamente.',
          'Parpadeos de pantalla entre rutas.',
          'Exceso de flags manuales isLoading e isError.'
        ]
      },
      keyTradeoffs: [
        {
          title: 'React con TanStack Query v5',
          pros: [
            'Deduplicación automática de peticiones en vuelo.',
            'Política stale-while-revalidate instantánea.'
          ],
          cons: [
            'Suma ~12 KB min+gzip al bundle.'
          ],
          whenToChoose: 'Casi imprescindible en aplicaciones React conectadas a APIs.'
        },
        {
          title: 'Angular con HttpClient + toSignal',
          pros: [
            'Integración nativa con DI e interceptores.',
            'Cero dependencias externas.'
          ],
          cons: [
            'Caché avanzada requiere configuración adicional.'
          ],
          whenToChoose: 'Proyectos Angular corporativos estandarizados.'
        }
      ],
      pitfalls: [
        'Distingue staleTime de gcTime en TanStack Query.',
        'Incluye todos los filtros en queryKey.'
      ],
      conclusion: [
        'Separar estado de servidor y de UI mejora radicalmente la fluidez percibida.'
      ],
      relatedArticleIds: ['signals-reactivity', 'net8-vs-fastapi']
    },
    {
      id: 'go-microservices',
      slug: 'go-fiber-gorm-microsservicos-alta-concorrencia',
      title: 'Go con Fiber y GORM vs Node.js: Microservicios de Alta Concurrencia',
      subtitle: 'Cómo las Goroutines permiten mantener decenas de miles de conexiones con mínimo consumo de RAM.',
      category: 'backend',
      tag: 'Backend • Concurrencia',
      targetTab: 'go',
      targetPage: 'backend',
      readingTime: '8 min de lectura',
      date: 'Julio 2024',
      updatedAt: 'Probado con Go 1.22 y Fiber v2',
      author: AUTHOR_ES,
      summary: 'Por qué servicios críticos de I/O adoptan Go, Fiber y GORM frente a runtimes de hilo único.',
      introduction: [
        'Go fue creado para la concurrencia en servidores modernos con Goroutines ligeras de ~2 KB y binarios estáticos diminutos.'
      ],
      contextProblem: {
        title: 'Cuellos de Botella en Concurrencia Masiva',
        description: 'Sostener miles de conexiones WebSocket o HTTP sin caer por Out-Of-Memory en Kubernetes.',
        symptoms: [
          'Reinicios por OOM bajo picos de tráfico.',
          'Bloqueos del Event Loop.'
        ]
      },
      keyTradeoffs: [
        {
          title: 'Go (Fiber + GORM / pgx)',
          pros: [
            'Goroutines de ~2 KB y arranque < 15ms.',
            'Contenedores Docker de ~15 MB.'
          ],
          cons: [
            'Manejo explícito de errores repetitivo (if err != nil).'
          ],
          whenToChoose: 'Gateways de API, mensajería y streaming en tiempo real.'
        }
      ],
      pitfalls: [
        'Propaga siempre context.Context para evitar fugas de Goroutines.',
        'Usa go test -race en CI.'
      ],
      conclusion: [
        'La simplicidad y concurrencia de Go lo convierten en referente para microservicios cloud-native.'
      ],
      relatedArticleIds: ['net8-vs-fastapi', 'sql-vs-nosql']
    },
    {
      id: 'indices-and-pagination',
      slug: 'indices-estrategicos-e-paginacao-por-cursor',
      title: 'Índices Estratégicos y Paginación por Cursor en Bases Relacionales',
      subtitle: 'Por qué OFFSET 500000 colapsa tu base y cómo Keyset Pagination garantiza O(1).',
      category: 'database',
      tag: 'Bases de Datos • Rendimiento',
      targetTab: 'relational',
      targetPage: 'database',
      readingTime: '9 min de lectura',
      date: 'Julio 2024',
      updatedAt: 'Compatible con PostgreSQL, MySQL y SQL Server',
      author: AUTHOR_ES,
      summary: 'Cómo leer EXPLAIN ANALYZE y reemplazar OFFSET profundos por cursores indexados.',
      introduction: [
        'En desarrollo cualquier query responde en milisegundos, pero con 10 millones de filas OFFSET destruye el I/O.'
      ],
      contextProblem: {
        title: 'El Costo Oculto de OFFSET',
        description: 'OFFSET 500000 obliga al motor a leer y descartar medio millón de filas en cada página.',
        symptoms: [
          'Las últimas páginas tardan 10x más que la primera.',
          'Registros duplicados ante inserciones concurrentes.'
        ]
      },
      keyTradeoffs: [
        {
          title: 'Paginación Keyset (Cursor)',
          pros: [
            'Tiempo constante O(1) en cualquier página.',
            'Resiliente a inserciones simultáneas.'
          ],
          cons: [
            'No permite saltar directamente a una página arbitraria sin cursor.'
          ],
          whenToChoose: 'Scroll infinito, APIs móviles y tablas masivas.'
        }
      ],
      pitfalls: [
        'Evita funciones sobre columnas indexadas en WHERE sin índice funcional.',
        'Equilibra número de índices para no penalizar escrituras.'
      ],
      conclusion: [
        'Un índice B-Tree correcto más paginación por cursor superan semanas de refactorización.'
      ],
      relatedArticleIds: ['sql-vs-nosql', 'net8-vs-fastapi']
    },
    {
      id: 'rabbitmq-vs-kafka-event-driven',
      slug: 'rabbitmq-vs-apache-kafka-mensageria-sistemas-distribuidos',
      title: 'RabbitMQ vs Apache Kafka: Arquitectura en Sistemas Orientados a Eventos',
      subtitle: 'Colas AMQP con enrutamiento inteligente frente a logs distribuidos inmutables de alto throughput.',
      category: 'backend',
      tag: 'Backend • Mensajería Distribuida',
      targetTab: 'dotnet',
      targetPage: 'backend',
      readingTime: '11 min de lectura',
      date: 'Noviembre 2024',
      updatedAt: 'Revisado para RabbitMQ 3.13 y Apache Kafka 3.7 (KRaft)',
      author: AUTHOR_ES,
      summary: 'Comparamos Smart Broker (RabbitMQ) frente a log distribuido inmutable (Kafka), Outbox Pattern, DLQ e idempotencia.',
      introduction: [
        'Encadenar microservicios vía HTTP síncrono provoca fallos en cascada. La arquitectura orientada a eventos desacopla emisor y consumidor.',
        'RabbitMQ enruta y elimina mensajes tras el ACK; Kafka retiene logs append-only permitiendo reprocesar histórico completo.'
      ],
      contextProblem: {
        title: 'Acoplamiento Temporal y Pérdida de Mensajes',
        description: 'Sin idempotencia, DLQ y Outbox Pattern surgen cobros duplicados y colas bloqueadas.',
        symptoms: [
          'Pagos duplicados por reintentos at-least-once.',
          'Mensajes corruptos bloqueando workers sin Dead Letter Queue.',
          'Desincronización entre BD y broker.'
        ]
      },
      benchmarks: {
        title: 'Benchmarks en Clúster de 3 Nodos',
        description: 'Pruebas sobre c6i.xlarge con payloads JSON persistentes de 1 KB.',
        data: [
          {
            metric: 'Throughput Sostenido (Msgs/seg)',
            stackA: 'RabbitMQ (Quorum): ~38.000 msgs/s',
            stackB: 'Apache Kafka: ~420.000 msgs/s',
            stackC: 'Redis Streams: ~85.000 msgs/s',
            observation: 'Kafka lidera con I/O secuencial, Zero-Copy y batching.'
          },
          {
            metric: 'Latencia Individual p99',
            stackA: 'RabbitMQ: 0.8ms',
            stackB: 'Apache Kafka: 7.4ms',
            stackC: 'Redis Streams: 0.4ms',
            observation: 'RabbitMQ entrega de inmediato por push.'
          },
          {
            metric: 'Enrutamiento',
            stackA: 'RabbitMQ: Exchanges complejos (Topic, Direct, Fanout)',
            stackB: 'Apache Kafka: Particionado por Partition Key',
            stackC: 'Redis Streams: Consumer Groups simples',
            observation: 'RabbitMQ filtra comodines directamente en el broker.'
          },
          {
            metric: 'Retención y Replay',
            stackA: 'RabbitMQ: Eliminado tras ACK',
            stackB: 'Apache Kafka: Retención configurable y replay completo',
            stackC: 'Redis Streams: Limitado por RAM',
            observation: 'Kafka permite reconstruir estados desde el offset 0.'
          }
        ]
      },
      keyTradeoffs: [
        {
          title: 'RabbitMQ (AMQP & Quorum Queues)',
          pros: [
            'Enrutamiento muy flexible mediante Exchanges.',
            'Latencia sub-milisegundo y DLX nativo.'
          ],
          cons: [
            'Menor techo de throughput que Kafka.',
            'Sin replay histórico tras ACK.'
          ],
          whenToChoose: 'Microservicios transaccionales, pagos y colas de trabajo.'
        },
        {
          title: 'Apache Kafka (Log Distribuido)',
          pros: [
            'Escalabilidad masiva a millones de eventos/s.',
            'Replay histórico y modo KRaft sin ZooKeeper.'
          ],
          cons: [
            'Mayor complejidad operativa.'
          ],
          whenToChoose: 'Ingesta masiva, IoT, CDC (Debezium), Event Sourcing y analítica.'
        }
      ],
      codeComparison: {
        title: 'Patrón Outbox & Consumo Resiliente con DLQ',
        description: 'Comparativa con MassTransit (.NET 8) y Confluent Kafka Producer (Python):',
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
        _logger.LogInformation("Procesando Pedido: {OrderId}", message.OrderId);
        await _payment.ChargeAsync(message.OrderId, message.TotalAmount, context.CancellationToken);
    }
}`,
            explanation: 'MassTransit aplica reintentos exponenciales y aísla errores definitivos en colas DLQ.'
          },
          {
            label: 'Python / FastAPI (Kafka Outbox)',
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
            explanation: 'La clave order_id garantiza orden estricto por partición junto a acks=all e idempotencia.'
          }
        ]
      },
      pitfalls: [
        'Usa siempre el Transactional Outbox Pattern para evitar escrituras dobles inconsistentes.',
        'Configura DLQ en RabbitMQ y consumidores idempotentes siempre.'
      ],
      conclusion: [
        'Usa RabbitMQ para colas transaccionales con enrutamiento fino y Kafka para streaming inmutable a escala masiva.'
      ],
      relatedArticleIds: ['net8-vs-fastapi', 'go-microservices', 'sql-vs-nosql']
    }
  ]
};

export default articlesEs;
