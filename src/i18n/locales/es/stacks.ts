import { StacksLocale } from '../../types.ts';

const stacksEs: StacksLocale = {
  frontend: [
    {
      id: 'component',
      title: '1. Creación de Componente',
      desc: 'Cómo declarar, recibir propiedades (props/inputs) y exportar un componente básico reutilizable.',
      category: 'Fundamentos',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Angular 17+ utiliza Standalone Components por defecto con la función tipada input().',
          code: `import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <div class="user-card">
      <h3>{{ name() }}</h3>
      <p>Cargo: {{ role() }}</p>
    </div>
  \`,
  styles: [\`
    .user-card { padding: 1rem; border-radius: 8px; border: 1px solid #334155; }
  \`]
})
export class UserCardComponent {
  // Input signals reactivos de Angular moderno
  readonly name = input.required<string>();
  readonly role = input<string>('Desarrollador');
}`
        },
        vue: {
          lang: 'html',
          notes: 'Vue 3 utiliza la sintaxis concisa de <script setup> con el macro defineProps().',
          code: `<script setup lang="ts">
// Declaración de props con tipado TypeScript puro
interface Props {
  name: string;
  role?: string;
}

withDefaults(defineProps<Props>(), {
  role: 'Desarrollador'
});
</script>

<template>
  <div class="user-card">
    <h3>{{ name }}</h3>
    <p>Cargo: {{ role }}</p>
  </div>
</template>

<style scoped>
.user-card { padding: 1rem; border-radius: 8px; border: 1px solid #334155; }
</style>`
        },
        react: {
          lang: 'tsx',
          notes: 'React utiliza funciones puras con desestructuración de props e interfaces TypeScript.',
          code: `import React from 'react';

interface UserCardProps {
  name: string;
  role?: string;
}

export function UserCard({ name, role = 'Desarrollador' }: UserCardProps) {
  return (
    <div className="user-card p-4 rounded-lg border border-slate-700">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-slate-400">Cargo: {role}</p>
    </div>
  );
}`
        }
      }
    },
    {
      id: 'binding',
      title: '2. Data Binding & Reactividad',
      desc: 'Cómo mantener el estado reactivo y sincronizar valores primitivos y derivados con la plantilla.',
      category: 'Reactividad',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Signals (signal y computed) ofrecen reactividad granular sin depender de Zone.js.',
          code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="counter">
      <p>Contador: <strong>{{ count() }}</strong></p>
      <p>Doble: <span>{{ doubleCount() }}</span></p>
      <input [value]="username()" (input)="onNameChange($event)" />
    </div>
  \`
})
export class CounterComponent {
  // Signal primitivo mutable
  count = signal(0);
  username = signal('Dev');

  // Valor computado reactivo
  doubleCount = computed(() => this.count() * 2);

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }
}`
        },
        vue: {
          lang: 'html',
          notes: 'ref() crea referencias reactivas mutables y computed() almacena valores derivados en caché.',
          code: `<script setup lang="ts">
import { ref, computed } from 'vue';

// Referencia reactiva mutable
const count = ref<number>(0);
const username = ref<string>('Dev');

// Valor computado derivado automáticamente
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <div class="counter">
    <p>Contador: <strong>{{ count }}</strong></p>
    <p>Doble: <span>{{ doubleCount }}</span></p>
    <!-- v-model para enlace bidireccional nativo -->
    <input v-model="username" />
  </div>
</template>`
        },
        react: {
          lang: 'tsx',
          notes: 'useState gestiona el estado y useMemo calcula valores derivados evitando recálculos innecesarios.',
          code: `import React, { useState, useMemo } from 'react';

export function Counter() {
  const [count, setCount] = useState<number>(0);
  const [username, setUsername] = useState<string>('Dev');

  // Valor memoizado derivado de count
  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <div className="counter">
      <p>Contador: <strong>{count}</strong></p>
      <p>Doble: <span>{doubleCount}</span></p>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}`
        }
      }
    },
    {
      id: 'events',
      title: '3. Event Handling (Click & Acciones)',
      desc: 'Cómo escuchar clics, pasar parámetros dinámicos y manipular el objeto de evento nativo.',
      category: 'Interactividad',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Usa la sintaxis de paréntesis (click)="handler(param)" y paso directo de argumentos.',
          code: `@Component({
  selector: 'app-actions',
  standalone: true,
  template: \`
    <div class="actions">
      <!-- Evento simple -->
      <button (click)="increment()">Incrementar</button>

      <!-- Evento con parámetro y $event nativo -->
      <button (click)="removeItem(item.id, $event)">
        Eliminar #{{ item.id }}
      </button>
    </div>
  \`
})
export class ActionsComponent {
  count = signal(0);
  item = { id: 42, title: 'Elemento de Prueba' };

  increment() {
    this.count.update(n => n + 1);
  }

  removeItem(id: number, event: MouseEvent) {
    event.stopPropagation();
    console.log('Eliminando ID:', id);
  }
}`
        },
        vue: {
          lang: 'html',
          notes: 'Usa la directiva @click o v-on:click con modificadores nativos como .stop y .prevent.',
          code: `<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const item = { id: 42, title: 'Elemento de Prueba' };

function increment() {
  count.value++;
}

function removeItem(id: number, e: MouseEvent) {
  console.log('Eliminando ID:', id, 'en coordenadas:', e.clientX);
}
</script>

<template>
  <div class="actions">
    <!-- Clic directo -->
    <button @click="increment">Incrementar</button>

    <!-- Paso de parámetro y evento $event con modificador -->
    <button @click.stop="removeItem(item.id, $event)">
      Eliminar #{{ item.id }}
    </button>
  </div>
</template>`
        },
        react: {
          lang: 'tsx',
          notes: 'Usa onClick en camelCase recibiendo una función callback o closure.',
          code: `import React, { useState } from 'react';

export function ActionButtons() {
  const [count, setCount] = useState(0);
  const item = { id: 42, title: 'Elemento de Prueba' };

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const removeItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Eliminando ID:', id);
  };

  return (
    <div className="flex gap-3">
      <button onClick={increment}>Incrementar</button>

      {/* Closure pasando id y evento sintético */}
      <button onClick={(e) => removeItem(item.id, e)}>
        Eliminar #{item.id}
      </button>
    </div>
  );
}`
        }
      }
    },
    {
      id: 'lifecycle',
      title: '4. Ciclo de Vida (onInit / onMounted)',
      desc: 'Cómo ejecutar código al montar el componente en el DOM y limpiar recursos al desmontar.',
      category: 'Ciclo de Vida',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Implementa OnInit y OnDestroy (o inject(DestroyRef) en Angular moderno).',
          code: `import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: \`<p>Tiempo activo: {{ seconds }}s</p>\`
})
export class TimerComponent implements OnInit, OnDestroy {
  seconds = 0;
  private intervalId: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    console.log('¡Componente montado!');
    this.intervalId = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  ngOnDestroy() {
    console.log('Limpiando temporizador al desmontar...');
    if (this.intervalId) clearInterval(this.intervalId);
  }
}`
        },
        vue: {
          lang: 'html',
          notes: 'Los hooks onMounted y onUnmounted se importan desde "vue" para control desacoplado.',
          code: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const seconds = ref(0);
let intervalId: number | undefined;

onMounted(() => {
  console.log('¡Componente montado en el DOM!');
  intervalId = window.setInterval(() => {
    seconds.value++;
  }, 1000);
});

onUnmounted(() => {
  console.log('Limpiando intervalo al desmontar...');
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <p>Tiempo activo: {{ seconds }}s</p>
</template>`
        },
        react: {
          lang: 'tsx',
          notes: 'El hook useEffect unifica montaje, actualización y limpieza devolviendo una función de cleanup.',
          code: `import React, { useState, useEffect } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('¡Componente montado!');
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Función de limpieza ejecutada al desmontar
    return () => {
      console.log('Limpiando intervalo al desmontar...');
      clearInterval(intervalId);
    };
  }, []); // Array vacío = se ejecuta solo al montar

  return <p>Tiempo activo: {seconds}s</p>;
}`
        }
      }
    },
    {
      id: 'http',
      title: '5. Peticiones HTTP (Fetch de Usuarios)',
      desc: 'Consumo de endpoint RESTful (/api/users) con tipado, estados de carga y manejo de errores.',
      category: 'Comunicación',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Utiliza HttpClient integrado con Signals y toSignal() para flujo reactivo puro.',
          code: `import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: \`
    @if (users()) {
      <ul>
        @for (user of users(); track user.id) {
          <li>{{ user.name }} ({{ user.email }})</li>
        }
      </ul>
    } @else {
      <p>Cargando usuarios...</p>
    }
  \`
})
export class UserListComponent {
  private http = inject(HttpClient);

  // Convierte Observable en Signal reactivo para la plantilla
  users = toSignal(
    this.http.get<User[]>('https://api.example.com/users').pipe(
      catchError(err => {
        console.error('Error al consultar:', err);
        return of([]);
      })
    ),
    { initialValue: null }
  );
}`
        },
        vue: {
          lang: 'html',
          notes: 'En Vue, useFetch o fetch asíncrono dentro de onMounted carga los datos con claridad.',
          code: `<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

const users = ref<User[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

async function fetchUsers() {
  try {
    loading.value = true;
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) throw new Error('Fallo en respuesta HTTP');
    users.value = await response.json();
  } catch (err: any) {
    error.value = err.message || 'Error al cargar';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUsers);
</script>

<template>
  <p v-if="loading">Cargando usuarios...</p>
  <p v-else-if="error" class="text-red-400">Error: {{ error }}</p>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.name }} ({{ user.email }})
    </li>
  </ul>
</template>`
        },
        react: {
          lang: 'tsx',
          notes: 'Patrón clásico con useEffect + estado (o useQuery de TanStack Query en aplicaciones completas).',
          code: `import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetch('https://api.example.com/users', {
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Error al obtener lista');
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort(); // Cancela petición al desmontar
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
}`
        }
      }
    },
    {
      id: 'state',
      title: '6. Gestión de Estado Global',
      desc: 'Compartir estado entre múltiples componentes sin prop-drilling (Store global).',
      category: 'Arquitectura',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Usa NgRx SignalStore o Servicios con Signals inyectables (providedIn: "root").',
          code: `import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // Estado reactivo privado
  private itemsSignal = signal<CartItem[]>([]);

  // Lecturas públicas de solo lectura
  readonly items = this.itemsSignal.asReadonly();
  readonly total = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.price, 0)
  );

  addItem(item: CartItem) {
    this.itemsSignal.update(items => [...items, item]);
  }

  clear() {
    this.itemsSignal.set([]);
  }
}`
        },
        vue: {
          lang: 'typescript',
          notes: 'Pinia es la store oficial recomendada por Vue, compatible con composables reactivos.',
          code: `import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export const useCartStore = defineStore('cart', () => {
  // Estado
  const items = ref<CartItem[]>([]);

  // Getters
  const total = computed(() =>
    items.value.reduce((acc, item) => acc + item.price, 0)
  );

  // Acciones
  function addItem(item: CartItem) {
    items.value.push(item);
  }

  function clear() {
    items.value = [];
  }

  return { items, total, addItem, clear };
});`
        },
        react: {
          lang: 'tsx',
          notes: 'Zustand es la solución minimalista moderna más popular (o React Context para casos simples).',
          code: `import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  clear: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clear: () => set({ items: [] }),
  getTotal: () => get().items.reduce((acc, item) => acc + item.price, 0)
}));

// En el componente React:
// const { items, addItem } = useCartStore();`
        }
      }
    }
  ],
  backend: {
    dotnet: {
      id: 'dotnet',
      name: '.NET 8 (C#)',
      tagline: 'Alto rendimiento, tipado estricto con Entity Framework Core y Minimal APIs',
      accentColor: 'text-purple-400',
      model: {
        filename: 'Models/User.cs',
        lang: 'csharp',
        explanation: 'Entidad de base de datos con anotaciones de validación y mapeo a PostgreSQL/SQL Server con EF Core.',
        code: `using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeCompare.Models;

[Table("users")]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;
}`
      },
      controller: {
        filename: 'Controllers/UsersController.cs',
        lang: 'csharp',
        explanation: 'Controlador REST clásico con inyección de dependencias de DbContext y persistencia asíncrona.',
        code: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeCompare.Data;
using CodeCompare.Models;

namespace CodeCompare.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<UsersController> _logger;

    // Inyección de dependencias del contexto de base de datos
    public UsersController(AppDbContext context, ILogger<UsersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // POST: api/users (Creación de usuario)
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
    }
}`
      },
      route: {
        endpoint: 'GET /api/users',
        lang: 'csharp',
        explanation: 'Endpoint asíncrono paginado con filtro de usuarios activos y AsNoTracking() para máxima velocidad.',
        code: `// GET: api/users?page=1&pageSize=20
[HttpGet]
[ProducesResponseType(StatusCodes.Status200OK)]
public async Task<ActionResult<IEnumerable<User>>> GetUsers(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 20)
{
    _logger.LogInformation("Consultando usuarios en la base de datos.");

    // AsNoTracking() desactiva el tracking de EF Core en lecturas rápidas
    var users = await _context.Users
        .AsNoTracking()
        .Where(u => u.IsActive)
        .OrderByDescending(u => u.CreatedAt)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return Ok(users);
}`
      }
    },
    java: {
      id: 'java',
      name: 'Java (Spring Boot 3)',
      tagline: 'Arquitectura corporativa robusta con Spring Data JPA, Hibernate y Java 21',
      accentColor: 'text-orange-400',
      model: {
        filename: 'src/main/java/com/codecompare/model/User.java',
        lang: 'java',
        explanation: 'Entidad JPA con Jakarta Persistence mapeando clave primaria autoincremental y auditoría.',
        code: `package com.codecompare.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 100)
    private String name;

    @Email
    @NotBlank(message = "El correo es obligatorio")
    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "is_active")
    private Boolean isActive = true;

    public User() {}
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}`
      },
      controller: {
        filename: 'src/main/java/com/codecompare/controller/UserController.java',
        lang: 'java',
        explanation: 'Controlador con @RestController, inyección de UserRepository y manejo de códigos HTTP.',
        code: `package com.codecompare.controller;

import com.codecompare.model.User;
import com.codecompare.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    // Inyección de dependencias por constructor (buena práctica en Spring)
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}`
      },
      route: {
        endpoint: 'GET /api/users',
        lang: 'java',
        explanation: 'Endpoint paginado usando Pageable de Spring Data JPA filtrando por estado activo.',
        code: `// GET /api/users?page=0&size=20
@GetMapping
public ResponseEntity<Page<User>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {

    // Spring Data PageRequest para paginación nativa en base de datos
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

    // Consulta optimizada derivada en el repositorio
    Page<User> users = userRepository.findByIsActiveTrue(pageable);

    return ResponseEntity.ok(users);
}`
      }
    },
    python: {
      id: 'python',
      name: 'Python (FastAPI)',
      tagline: 'Velocidad moderna con tipado asíncrono (AsyncIO), Pydantic v2 y SQLAlchemy',
      accentColor: 'text-blue-400',
      model: {
        filename: 'app/models/user.py',
        lang: 'python',
        explanation: 'Modelos ORM con SQLAlchemy DeclarativeBase + Schemas de validación y serialización de Pydantic.',
        code: `from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel, EmailStr

Base = declarative_base()

# Modelo de Base de Datos (SQLAlchemy)
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

# Schema de Salida para la API (Pydantic v2)
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True`
      },
      controller: {
        filename: 'app/routers/users.py',
        lang: 'python',
        explanation: 'Router de FastAPI con inyección de dependencia de sesión asíncrona (AsyncSession).',
        code: `from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import UserModel, UserResponse, UserCreate

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    # Creación del usuario en transacción asíncrona
    new_user = UserModel(**payload.model_dump())
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user`
      },
      route: {
        endpoint: 'GET /api/users',
        lang: 'python',
        explanation: 'Consulta asíncrona con SQLAlchemy select(), limit y offset con respuesta en milisegundos.',
        code: `@router.get("/", response_model=list[UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db)
):
    """
    Devuelve la lista paginada de usuarios activos desde PostgreSQL.
    """
    query = (
        select(UserModel)
        .where(UserModel.is_active == True)
        .order_by(UserModel.created_at.desc())
        .offset(skip)
        .limit(limit)
    )

    result = await db.execute(query)
    users = result.scalars().all()

    return users`
      }
    },
    go: {
      id: 'go',
      name: 'Go (Fiber / GORM)',
      tagline: 'Binario único ultraligero, baja latencia y concurrencia nativa con Goroutines',
      accentColor: 'text-cyan-400',
      model: {
        filename: 'models/user.go',
        lang: 'go',
        explanation: 'Struct Go con etiquetas GORM para migración y etiquetas JSON para serialización de API.',
        code: `package models

import (
	"time"
)

// User representa la tabla en la base de datos
type User struct {
	ID        uint      \`gorm:"primaryKey" json:"id"\`
	Name      string    \`gorm:"size:100;not null" json:"name"\`
	Email     string    \`gorm:"size:150;uniqueIndex;not null" json:"email"\`
	IsActive  bool      \`gorm:"default:true" json:"is_active"\`
	CreatedAt time.Time \`json:"created_at"\`
	UpdatedAt time.Time \`json:"updated_at"\`
}`
      },
      controller: {
        filename: 'handlers/user_handler.go',
        lang: 'go',
        explanation: 'Handler con Fiber Ctx y GORM DB gestionando binding de payload y errores HTTP idiomáticos.',
        code: `package handlers

import (
	"codecompare/database"
	"codecompare/models"
	"github.com/gofiber/fiber/v2"
)

// CreateUser registra un nuevo usuario
func CreateUser(c *fiber.Ctx) error {
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Datos inválidos",
		})
	}

	result := database.DB.Create(&user)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}`
      },
      route: {
        endpoint: 'GET /api/users',
        lang: 'go',
        explanation: 'Consulta paginada encadenando métodos de GORM (Where, Order, Offset, Limit, Find).',
        code: `// GetUsers consulta los usuarios en la base de datos
func GetUsers(c *fiber.Ctx) error {
	var users []models.User

	// Lectura de parámetros query con valores por defecto
	page := c.QueryInt("page", 1)
	pageSize := c.QueryInt("pageSize", 20)
	offset := (page - 1) * pageSize

	// Ejecuta la consulta reutilizando el pool de conexiones
	result := database.DB.
		Where("is_active = ?", true).
		Order("created_at desc").
		Offset(offset).
		Limit(pageSize).
		Find(&users)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al consultar usuarios en la base",
		})
	}

	return c.JSON(users)
}`
      }
    }
  },
  nosql: [
    {
      name: 'MongoDB',
      category: 'Document Store (BSON / JSON)',
      whenToUse: 'Sistemas con esquemas flexibles y dinámicos, catálogos de e-commerce, perfiles de usuarios, CMS y pipelines con documentos anidados.',
      whenNotToUse: 'Transacciones financieras complejas entre múltiples entidades no relacionadas o donde la integridad referencial estricta sea prioridad.',
      dataModel: 'Colecciones de documentos JSON/BSON con soporte para índices secundarios, agregaciones avanzadas y sharding horizontal.',
      queryLang: 'javascript',
      exampleQuery: `// Búsqueda paginada con agregación y proyección en MongoDB
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
      category: 'In-Memory Key-Value & Estructuras de Datos',
      whenToUse: 'Capa de caché ultrarrápida (sub-milisegundo), sesiones de usuario, colas asíncronas, rate limiting, rankings y pub/sub.',
      whenNotToUse: 'Almacenamiento primario permanente para grandes volúmenes históricos o consultas relacionales complejas.',
      dataModel: 'Clave-valor en memoria RAM con Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps y Streams con TTL automático.',
      queryLang: 'bash',
      exampleQuery: `# Guardar perfil en caché con expiración de 1 hora (3600s)
SET user:profile:1024 '{"id":1024,"name":"Carlos","tier":"pro"}' EX 3600

# Añadir puntuación al ranking semanal
ZADD leaderboard:weekly 1450 "player_carlos"

# Obtener el top 3 del ranking
ZREVRANGE leaderboard:weekly 0 2 WITHSCORES`
    },
    {
      name: 'Apache Cassandra',
      category: 'Wide-Column Store (Distribuido)',
      whenToUse: 'Volumen masivo de escrituras (Write-Heavy), series temporales (IoT), telemetría, feeds de actividad y replicación multi-datacenter sin punto único de fallo.',
      whenNotToUse: 'Sistemas que exigen consultas ad-hoc dinámicas, operaciones JOIN o actualizaciones concurrentes sobre el mismo registro.',
      dataModel: 'Tablas columnares distribuidas indexadas por Partition Key y Clustering Key (CQL - Cassandra Query Language).',
      queryLang: 'sql',
      exampleQuery: `-- Tabla diseñada estrictamente para el patrón de lectura (IoT)
CREATE TABLE sensor_readings (
    sensor_id uuid,
    day date,
    read_time timestamp,
    temperature double,
    humidity double,
    PRIMARY KEY ((sensor_id, day), read_time)
) WITH CLUSTERING ORDER BY (read_time DESC);

-- Lectura de alto rendimiento por clave de partición
SELECT * FROM sensor_readings
WHERE sensor_id = 7a8c3d-e4f1-4a2b
  AND day = '2024-03-15'
LIMIT 50;`
    },
    {
      name: 'Amazon DynamoDB',
      category: 'Serverless Managed NoSQL',
      whenToUse: 'Aplicaciones nativas de AWS, arquitecturas Serverless (Lambda), carritos de compra y sistemas con latencia constante de un dígito a cualquier escala.',
      whenNotToUse: 'Consultas analíticas complejas si no se diseñaron Global Secondary Indexes (GSIs) por adelantado.',
      dataModel: 'Almacén Key-Value y documental gestionado, particionado por Partition Key (HASH) y Sort Key (RANGE) opcional.',
      queryLang: 'json',
      exampleQuery: `// Llamada con AWS SDK v3 (JavaScript / Node.js)
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
  ],
  relational: [
    {
      id: 'indices',
      title: '1. Índices Estratégicos (B-Tree vs GIN)',
      badge: 'Indexación',
      summary: 'Elegir la estructura de índice correcta evita escaneos completos de tabla (Seq Scan).',
      problem: 'Tablas con millones de filas se vuelven lentas al filtrar columnas de alta cardinalidad o campos JSON/texto sin un índice adecuado.',
      solution: 'Usa B-Tree para igualdades (=), rangos (<, >) y claves foráneas. Usa GIN (Generalized Inverted Index) para JSONB, arreglos y búsqueda Full-Text.',
      sqlBefore: `-- Sin índice adecuado: ejecuta Seq Scan en 5 millones de filas (~1800ms)
SELECT id, email, created_at FROM users
WHERE email = 'dev@codecompare.com';`,
      sqlAfter: `-- Índice único B-Tree + índice GIN para metadatos JSON
CREATE UNIQUE INDEX idx_users_email ON users (email);
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);

-- Consulta optimizada: Index Scan instantáneo (< 2ms)
SELECT id, email, created_at FROM users
WHERE email = 'dev@codecompare.com';`,
      impact: 'Reducción del 99.8% en tiempo de respuesta (de 1800ms a 1.4ms)'
    },
    {
      id: 'explain',
      title: '2. EXPLAIN (ANALYZE, BUFFERS)',
      badge: 'Diagnóstico',
      summary: 'Diagnosticar el costo real y el plan de ejecución antes de optimizar a ciegas.',
      problem: 'Muchos desarrolladores optimizan asumiendo cuellos de botella sin saber si el tiempo se consumió en I/O de disco, ordenamientos o joins.',
      solution: 'Ejecuta siempre EXPLAIN (ANALYZE, BUFFERS) para ver tiempos reales por nodo y páginas leídas desde caché vs disco.',
      sqlBefore: `-- Ejecutar la consulta a ciegas sin métricas
SELECT o.id, c.name, SUM(i.price * i.qty)
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items i ON i.order_id = o.id
GROUP BY o.id, c.name;`,
      sqlAfter: `-- Analizar métricas de ejecución en PostgreSQL
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)
SELECT o.id, c.name, SUM(i.price * i.qty)
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items i ON i.order_id = o.id
GROUP BY o.id, c.name;
-- Busca: "Seq Scan", "Buffers: read", "External merge disk"`,
      impact: 'Detecta nodos con I/O de disco innecesario y falta de memoria en work_mem'
    },
    {
      id: 'n-plus-1',
      title: '3. Prevención del Problema N+1 en ORMs',
      badge: 'Arquitectura',
      summary: 'Sustituir bucles de consultas secundarias por Eager Loading o joins por lote.',
      problem: 'Un endpoint que lista 50 pedidos ejecuta 1 consulta inicial y 50 consultas individuales para los ítems de cada pedido (51 viajes a la base).',
      solution: 'Utiliza JOIN FETCH (Hibernate/JPA), Include() (Entity Framework), select_related/prefetch_related (SQLAlchemy) o Preload() (GORM).',
      sqlBefore: `-- Problema N+1 generado por ORM descuidado (1 + 50 consultas)
SELECT * FROM orders LIMIT 50;
SELECT * FROM order_items WHERE order_id = 1;
SELECT * FROM order_items WHERE order_id = 2;
-- ... repetido 50 veces!`,
      sqlAfter: `-- Solución con Eager Loading (1 sola consulta con JOIN)
SELECT o.id, o.total, i.id AS item_id, i.product_name, i.price
FROM orders o
LEFT JOIN order_items i ON i.order_id = o.id
WHERE o.id IN (SELECT id FROM orders LIMIT 50);`,
      impact: 'Reduce 51 viajes de red a solo 1 consulta consolidada'
    },
    {
      id: 'cursor-pagination',
      title: '4. Paginación por Cursor (Keyset Pagination)',
      badge: 'Rendimiento',
      summary: 'Eliminar OFFSET elevado para garantizar tiempo constante O(1) en tablas gigantes.',
      problem: 'OFFSET 500000 obliga a la base de datos a leer y descartar 500.000 filas antes de devolver 20, degradando las páginas finales.',
      solution: 'Sustituye OFFSET por un filtro sobre la columna indexada: WHERE id < cursor ORDER BY id DESC LIMIT 20.',
      sqlBefore: `-- Lento: lee y descarta 500 mil registros (~850ms)
SELECT id, title, created_at FROM logs
ORDER BY id DESC
OFFSET 500000 LIMIT 20;`,
      sqlAfter: `-- Rápido (Keyset Pagination): usa el índice directamente (~1.2ms)
-- El cliente envía el último ID visto como cursor
SELECT id, title, created_at FROM logs
WHERE id < 4599980
ORDER BY id DESC
LIMIT 20;`,
      impact: 'Tiempo de respuesta constante O(1) incluso en la página 100.000'
    },
    {
      id: 'caching-strategy',
      title: '5. Caching Estratégico (Patrón Cache-Aside)',
      badge: 'Escalabilidad',
      summary: 'Proteger la base relacional frente a lecturas repetitivas mediante caché en memoria.',
      problem: 'Miles de peticiones concurrentes ejecutan las mismas agregaciones o lecturas de catálogo estático, saturando el pool de conexiones.',
      solution: 'Implementa Cache-Aside con Redis: consulta primero el caché; ante un Miss, consulta la BD, guarda con TTL corto y devuelve.',
      sqlBefore: `-- 5.000 req/s impactando directo en PostgreSQL:
SELECT c.name, COUNT(p.id) AS total_products
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name;`,
      sqlAfter: `-- Pseudocódigo de aplicación con Redis Cache-Aside:
-- 1. cached = redis.get("catalog:categories_summary")
-- 2. if (cached) return cached;
-- 3. data = db.query("SELECT c.name, COUNT(p.id) ...")
-- 4. redis.set("catalog:categories_summary", data, EX=300) # 5 min
-- 5. return data;`,
      impact: 'Alivia hasta el 95% del tráfico de lectura sobre las instancias primarias'
    },
    {
      id: 'partitioning',
      title: '6. Particionado Declarativo de Tablas',
      badge: 'Big Data',
      summary: 'Dividir tablas de cientos de millones de filas en particiones lógicas manejables.',
      problem: 'Tablas monolíticas de auditoría, facturación o métricas crecen hasta que los índices dejan de caber en la memoria RAM.',
      solution: 'Particiona por rango de fechas (Range Partitioning). El optimizador aplica Partition Pruning leyendo solo el mes necesario.',
      sqlBefore: `-- Tabla monolítica de 200 millones de registros de auditoría
CREATE TABLE audit_logs (
    id bigserial,
    event_time timestamp not null,
    payload jsonb
);`,
      sqlAfter: `-- Tabla particionada nativamente por rango de fecha (PostgreSQL 12+)
CREATE TABLE audit_logs (
    id bigserial,
    event_time timestamp not null,
    payload jsonb
) PARTITION BY RANGE (event_time);

-- Particiones mensuales
CREATE TABLE audit_logs_2024_01 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE audit_logs_2024_02 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');`,
      impact: 'Permite Partition Pruning y eliminación histórica instantánea con DROP TABLE'
    }
  ]
};

export default stacksEs;
