import { StacksLocale } from '../../types.ts';

const stacksEn: StacksLocale = {
  frontend: [
    {
      id: 'component',
      title: '1. Component Creation',
      desc: 'How to declare, receive properties (props/inputs), and export a basic reusable component.',
      category: 'Fundamentals',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Angular 17+ defaults to Standalone Components with typed signal-based input().',
          code: `import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <div class="user-card">
      <h3>{{ name() }}</h3>
      <p>Role: {{ role() }}</p>
    </div>
  \`,
  styles: [\`
    .user-card { padding: 1rem; border-radius: 8px; border: 1px solid #334155; }
  \`]
})
export class UserCardComponent {
  // Modern Angular reactive input signals
  readonly name = input.required<string>();
  readonly role = input<string>('Developer');
}`
        },
        vue: {
          lang: 'html',
          notes: 'Vue 3 uses concise <script setup> syntax with the defineProps() compiler macro.',
          code: `<script setup lang="ts">
// Prop declaration with pure TypeScript types
interface Props {
  name: string;
  role?: string;
}

withDefaults(defineProps<Props>(), {
  role: 'Developer'
});
</script>

<template>
  <div class="user-card">
    <h3>{{ name }}</h3>
    <p>Role: {{ role }}</p>
  </div>
</template>

<style scoped>
.user-card { padding: 1rem; border-radius: 8px; border: 1px solid #334155; }
</style>`
        },
        react: {
          lang: 'tsx',
          notes: 'React uses pure functions with destructured props and TypeScript interfaces.',
          code: `import React from 'react';

interface UserCardProps {
  name: string;
  role?: string;
}

export function UserCard({ name, role = 'Developer' }: UserCardProps) {
  return (
    <div className="user-card p-4 rounded-lg border border-slate-700">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-slate-400">Role: {role}</p>
    </div>
  );
}`
        }
      }
    },
    {
      id: 'binding',
      title: '2. Data Binding & Reactivity',
      desc: 'How to manage reactive state and keep primitive and derived values synchronized with the template.',
      category: 'Reactivity',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Signals (signal and computed) deliver fine-grained reactivity without relying on Zone.js.',
          code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="counter">
      <p>Counter: <strong>{{ count() }}</strong></p>
      <p>Double: <span>{{ doubleCount() }}</span></p>
      <input [value]="username()" (input)="onNameChange($event)" />
    </div>
  \`
})
export class CounterComponent {
  // Mutable primitive signal
  count = signal(0);
  username = signal('Dev');

  // Reactive derived value
  doubleCount = computed(() => this.count() * 2);

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }
}`
        },
        vue: {
          lang: 'html',
          notes: 'ref() creates mutable reactive references and computed() caches derived values.',
          code: `<script setup lang="ts">
import { ref, computed } from 'vue';

// Mutable reactive reference
const count = ref<number>(0);
const username = ref<string>('Dev');

// Automatically derived computed value
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <div class="counter">
    <p>Counter: <strong>{{ count }}</strong></p>
    <p>Double: <span>{{ doubleCount }}</span></p>
    <!-- Native two-way data binding with v-model -->
    <input v-model="username" />
  </div>
</template>`
        },
        react: {
          lang: 'tsx',
          notes: 'useState manages state while useMemo computes derived values without redundant work.',
          code: `import React, { useState, useMemo } from 'react';

export function Counter() {
  const [count, setCount] = useState<number>(0);
  const [username, setUsername] = useState<string>('Dev');

  // Memoized value derived from count
  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <div className="counter">
      <p>Counter: <strong>{count}</strong></p>
      <p>Double: <span>{doubleCount}</span></p>
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
      title: '3. Event Handling (Clicks & Actions)',
      desc: 'How to listen for click events, pass dynamic arguments, and handle the native event object.',
      category: 'Interactivity',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Uses parenthesis binding (click)="handler(param)" and passes $event directly when needed.',
          code: `@Component({
  selector: 'app-actions',
  standalone: true,
  template: \`
    <div class="actions">
      <!-- Simple event -->
      <button (click)="increment()">Increment</button>

      <!-- Event with argument and native $event -->
      <button (click)="removeItem(item.id, $event)">
        Delete #{{ item.id }}
      </button>
    </div>
  \`
})
export class ActionsComponent {
  count = signal(0);
  item = { id: 42, title: 'Sample Item' };

  increment() {
    this.count.update(n => n + 1);
  }

  removeItem(id: number, event: MouseEvent) {
    event.stopPropagation();
    console.log('Removing ID:', id);
  }
}`
        },
        vue: {
          lang: 'html',
          notes: 'Uses @click or v-on:click with built-in modifiers such as .stop and .prevent.',
          code: `<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const item = { id: 42, title: 'Sample Item' };

function increment() {
  count.value++;
}

function removeItem(id: number, e: MouseEvent) {
  console.log('Removing ID:', id, 'at coordinates:', e.clientX);
}
</script>

<template>
  <div class="actions">
    <!-- Direct click handler -->
    <button @click="increment">Increment</button>

    <!-- Passing argument and native $event with modifier -->
    <button @click.stop="removeItem(item.id, $event)">
      Delete #{{ item.id }}
    </button>
  </div>
</template>`
        },
        react: {
          lang: 'tsx',
          notes: 'Uses camelCase onClick accepting a callback function or closure.',
          code: `import React, { useState } from 'react';

export function ActionButtons() {
  const [count, setCount] = useState(0);
  const item = { id: 42, title: 'Sample Item' };

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const removeItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Removing ID:', id);
  };

  return (
    <div className="flex gap-3">
      <button onClick={increment}>Increment</button>

      {/* Closure passing id and synthetic event */}
      <button onClick={(e) => removeItem(item.id, e)}>
        Delete #{item.id}
      </button>
    </div>
  );
}`
        }
      }
    },
    {
      id: 'lifecycle',
      title: '4. Component Lifecycle (onInit / onMounted)',
      desc: 'How to run setup code on DOM mount and perform clean-up on component unmount.',
      category: 'Lifecycle',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Implements OnInit and OnDestroy (or uses inject(DestroyRef) in modern Angular).',
          code: `import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: \`<p>Active time: {{ seconds }}s</p>\`
})
export class TimerComponent implements OnInit, OnDestroy {
  seconds = 0;
  private intervalId: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    console.log('Component mounted!');
    this.intervalId = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  ngOnDestroy() {
    console.log('Clearing timer on unmount...');
    if (this.intervalId) clearInterval(this.intervalId);
  }
}`
        },
        vue: {
          lang: 'html',
          notes: 'onMounted and onUnmounted hooks are imported from "vue" for decoupled lifecycle control.',
          code: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const seconds = ref(0);
let intervalId: number | undefined;

onMounted(() => {
  console.log('Component mounted in DOM!');
  intervalId = window.setInterval(() => {
    seconds.value++;
  }, 1000);
});

onUnmounted(() => {
  console.log('Clearing interval on unmount...');
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <p>Active time: {{ seconds }}s</p>
</template>`
        },
        react: {
          lang: 'tsx',
          notes: 'useEffect unifies mount, update, and cleanup by returning a cleanup callback.',
          code: `import React, { useState, useEffect } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('Component mounted!');
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function executed on unmount
    return () => {
      console.log('Clearing interval on unmount...');
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array = runs once on mount

  return <p>Active time: {seconds}s</p>;
}`
        }
      }
    },
    {
      id: 'http',
      title: '5. HTTP Requests (Fetching Users)',
      desc: 'Consuming a REST endpoint (/api/users) with strong typing, loading state, and error handling.',
      category: 'Networking',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Uses HttpClient paired with Signals and toSignal() for clean reactive flows.',
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
      <p>Loading users...</p>
    }
  \`
})
export class UserListComponent {
  private http = inject(HttpClient);

  // Converts Observable into a reactive Signal for the template
  users = toSignal(
    this.http.get<User[]>('https://api.example.com/users').pipe(
      catchError(err => {
        console.error('Fetch failed:', err);
        return of([]);
      })
    ),
    { initialValue: null }
  );
}`
        },
        vue: {
          lang: 'html',
          notes: 'In Vue, composables like useFetch or async fetch inside onMounted load data cleanly.',
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
    if (!response.ok) throw new Error('HTTP request failed');
    users.value = await response.json();
  } catch (err: any) {
    error.value = err.message || 'Loading error';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUsers);
</script>

<template>
  <p v-if="loading">Loading users...</p>
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
          notes: 'Classic useEffect + state pattern (or useQuery from TanStack Query in production apps).',
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
        if (!res.ok) throw new Error('Failed to load users');
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
    return () => controller.abort(); // Aborts request on unmount
  }, []);

  if (loading) return <p>Loading users...</p>;
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
      title: '6. Global State Management',
      desc: 'Sharing state across multiple disconnected components without prop-drilling (Global Store).',
      category: 'Architecture',
      codes: {
        angular: {
          lang: 'typescript',
          notes: 'Uses NgRx SignalStore or injectable Services with Signals (providedIn: "root").',
          code: `import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // Private mutable reactive state
  private itemsSignal = signal<CartItem[]>([]);

  // Public read-only selectors
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
          notes: 'Pinia is Vue’s official store solution with clean composable Setup Stores.',
          code: `import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);

  // Getters
  const total = computed(() =>
    items.value.reduce((acc, item) => acc + item.price, 0)
  );

  // Actions
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
          notes: 'Zustand is the leading minimalist store (or React Context for lightweight state).',
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

// Inside React component:
// const { items, addItem } = useCartStore();`
        }
      }
    }
  ],
  backend: {
    dotnet: {
      id: 'dotnet',
      name: '.NET 8 (C#)',
      tagline: 'High throughput, strict static typing with Entity Framework Core and Minimal APIs',
      accentColor: 'text-purple-400',
      model: {
        filename: 'Models/User.cs',
        lang: 'csharp',
        explanation: 'Database entity with validation annotations and PostgreSQL/SQL Server mapping via EF Core.',
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
        explanation: 'Classic REST controller with constructor DI for DbContext and async database persistence.',
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

    // Dependency injection of the database context
    public UsersController(AppDbContext context, ILogger<UsersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // POST: api/users (Create user)
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
        explanation: 'Async paginated endpoint filtering active users with AsNoTracking() for zero change-tracker overhead.',
        code: `// GET: api/users?page=1&pageSize=20
[HttpGet]
[ProducesResponseType(StatusCodes.Status200OK)]
public async Task<ActionResult<IEnumerable<User>>> GetUsers(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 20)
{
    _logger.LogInformation("Querying users from database.");

    // AsNoTracking() disables EF Core tracking for fast read-only queries
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
      tagline: 'Enterprise-grade architecture with Spring Data JPA, Hibernate, and Java 21',
      accentColor: 'text-orange-400',
      model: {
        filename: 'src/main/java/com/codecompare/model/User.java',
        lang: 'java',
        explanation: 'JPA entity using Jakarta Persistence with auto-increment primary key and audit timestamp.',
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

    @NotBlank(message = "Name is required")
    @Column(nullable = false, length = 100)
    private String name;

    @Email
    @NotBlank(message = "Email is required")
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
        explanation: '@RestController with constructor-based UserRepository injection and explicit HTTP status codes.',
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

    // Constructor dependency injection (Spring best practice)
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
        explanation: 'Paginated endpoint using Spring Data JPA Pageable filtering active accounts.',
        code: `// GET /api/users?page=0&size=20
@GetMapping
public ResponseEntity<Page<User>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {

    // Spring Data PageRequest for database-native pagination
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

    // Optimized derived repository query
    Page<User> users = userRepository.findByIsActiveTrue(pageable);

    return ResponseEntity.ok(users);
}`
      }
    },
    python: {
      id: 'python',
      name: 'Python (FastAPI)',
      tagline: 'Modern developer velocity with AsyncIO typing, Pydantic v2, and SQLAlchemy',
      accentColor: 'text-blue-400',
      model: {
        filename: 'app/models/user.py',
        lang: 'python',
        explanation: 'ORM models with SQLAlchemy DeclarativeBase paired with Pydantic v2 schemas for validation and serialization.',
        code: `from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel, EmailStr

Base = declarative_base()

# Database Model (SQLAlchemy)
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

# API Output Schema (Pydantic v2)
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
        explanation: 'FastAPI router with async database session dependency injection (AsyncSession).',
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
    # Create user inside async database transaction
    new_user = UserModel(**payload.model_dump())
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user`
      },
      route: {
        endpoint: 'GET /api/users',
        lang: 'python',
        explanation: 'Asynchronous query using SQLAlchemy select(), limit, and offset for millisecond response times.',
        code: `@router.get("/", response_model=list[UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db)
):
    """
    Returns a paginated list of active users from PostgreSQL.
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
      tagline: 'Ultra-lightweight single binary, low tail latency, and native concurrency with Goroutines',
      accentColor: 'text-cyan-400',
      model: {
        filename: 'models/user.go',
        lang: 'go',
        explanation: 'Go struct with GORM tags for schema migration and JSON tags for API serialization.',
        code: `package models

import (
	"time"
)

// User represents the database table
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
        explanation: 'Fiber Ctx and GORM DB handler with request body parsing and idiomatic Go error checks.',
        code: `package handlers

import (
	"codecompare/database"
	"codecompare/models"
	"github.com/gofiber/fiber/v2"
)

// CreateUser persists a new user
func CreateUser(c *fiber.Ctx) error {
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
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
        explanation: 'Paginated query chaining GORM methods (Where, Order, Offset, Limit, Find).',
        code: `// GetUsers fetches active users from the database
func GetUsers(c *fiber.Ctx) error {
	var users []models.User

	// Parse query params with defaults
	page := c.QueryInt("page", 1)
	pageSize := c.QueryInt("pageSize", 20)
	offset := (page - 1) * pageSize

	// Execute query using the persistent connection pool
	result := database.DB.
		Where("is_active = ?", true).
		Order("created_at desc").
		Offset(offset).
		Limit(pageSize).
		Find(&users)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to query users from database",
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
      whenToUse: 'Systems with flexible evolving schemas, e-commerce catalogs, user profiles, CMS, and data pipelines with nested documents.',
      whenNotToUse: 'Complex multi-entity financial transactions or workloads where strict relational foreign-key integrity is top priority.',
      dataModel: 'Collections of JSON/BSON documents supporting secondary indexes, rich aggregation pipelines, and horizontal sharding.',
      queryLang: 'javascript',
      exampleQuery: `// Paginated aggregation pipeline with projection in MongoDB
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
      whenToUse: 'Sub-millisecond caching layers, user sessions, async job queues, rate limiting, leaderboards, and pub/sub messaging.',
      whenNotToUse: 'Long-term primary storage for massive cold datasets or queries requiring relational joins.',
      dataModel: 'In-memory key-value engine supporting Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, and Streams with automatic TTL.',
      queryLang: 'bash',
      exampleQuery: `# Cache JSON profile with 1-hour expiration (3600 seconds)
SET user:profile:1024 '{"id":1024,"name":"Carlos","tier":"pro"}' EX 3600

# Add score to an ordered leaderboard
ZADD leaderboard:weekly 1450 "player_carlos"

# Fetch top 3 players with scores
ZREVRANGE leaderboard:weekly 0 2 WITHSCORES`
    },
    {
      name: 'Apache Cassandra',
      category: 'Wide-Column Store (Distributed)',
      whenToUse: 'Massive write-heavy workloads, IoT time-series telemetry, activity feeds, and multi-datacenter replication with zero single point of failure.',
      whenNotToUse: 'Systems needing ad-hoc dynamic queries, server-side JOINs, or frequent concurrent updates to the same row.',
      dataModel: 'Distributed wide-column tables indexed by Partition Key and Clustering Key (CQL - Cassandra Query Language).',
      queryLang: 'sql',
      exampleQuery: `-- Table schema modeled specifically around the IoT read pattern
CREATE TABLE sensor_readings (
    sensor_id uuid,
    day date,
    read_time timestamp,
    temperature double,
    humidity double,
    PRIMARY KEY ((sensor_id, day), read_time)
) WITH CLUSTERING ORDER BY (read_time DESC);

-- Fast partition-key lookup
SELECT * FROM sensor_readings
WHERE sensor_id = 7a8c3d-e4f1-4a2b
  AND day = '2024-03-15'
LIMIT 50;`
    },
    {
      name: 'Amazon DynamoDB',
      category: 'Serverless Managed NoSQL',
      whenToUse: 'AWS-native applications, Serverless APIs (Lambda), shopping carts, and systems demanding consistent single-digit millisecond latency at any scale.',
      whenNotToUse: 'Analytical ad-hoc reporting unless Global Secondary Indexes (GSIs) are explicitly modeled in advance.',
      dataModel: 'Fully managed Key-Value and Document store partitioned by Partition Key (HASH) and optional Sort Key (RANGE).',
      queryLang: 'json',
      exampleQuery: `// Query call via AWS SDK v3 (JavaScript / Node.js)
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
      title: '1. Strategic Indexing (B-Tree vs GIN)',
      badge: 'Indexing',
      summary: 'Choosing the right index structure eliminates full-table sequential scans (Seq Scan).',
      problem: 'Tables with millions of rows stall when filtering high-cardinality columns or querying nested JSON/text fields without tailored indexes.',
      solution: 'Use B-Tree for equality (=), range sorting (<, >), and foreign keys. Use GIN (Generalized Inverted Index) for JSONB, arrays, and full-text search.',
      sqlBefore: `-- Missing index: triggers a Seq Scan across 5M rows (~1800ms)
SELECT id, email, created_at FROM users
WHERE email = 'dev@codecompare.com';`,
      sqlAfter: `-- Unique B-Tree index + GIN index for JSON metadata
CREATE UNIQUE INDEX idx_users_email ON users (email);
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);

-- Tuned query: instant Index Scan (< 2ms)
SELECT id, email, created_at FROM users
WHERE email = 'dev@codecompare.com';`,
      impact: '99.8% reduction in response latency (from 1800ms down to 1.4ms)'
    },
    {
      id: 'explain',
      title: '2. EXPLAIN (ANALYZE, BUFFERS)',
      badge: 'Diagnostics',
      summary: 'Measure real query cost and execution plans before tuning blindly.',
      problem: 'Engineers frequently guess bottlenecks without knowing whether time was spent on disk I/O, in-memory sorting, or inefficient joins.',
      solution: 'Always run EXPLAIN (ANALYZE, BUFFERS) to inspect actual timing per node, shared buffer cache hits vs physical disk reads.',
      sqlBefore: `-- Running complex query blindly without metrics
SELECT o.id, c.name, SUM(i.price * i.qty)
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items i ON i.order_id = o.id
GROUP BY o.id, c.name;`,
      sqlAfter: `-- Inspecting full PostgreSQL execution metrics
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)
SELECT o.id, c.name, SUM(i.price * i.qty)
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items i ON i.order_id = o.id
GROUP BY o.id, c.name;
-- Watch out for: "Seq Scan", "Buffers: read", "External merge disk"`,
      impact: 'Exposes nodes causing unnecessary disk I/O or work_mem spills'
    },
    {
      id: 'n-plus-1',
      title: '3. Preventing the ORM N+1 Problem',
      badge: 'Architecture',
      summary: 'Replace per-item query loops with Eager Loading or batched joins.',
      problem: 'An endpoint listing 50 orders runs 1 query for the orders plus 50 extra queries to load items for each order (51 round-trips).',
      solution: 'Use JOIN FETCH (Hibernate/JPA), Include() (EF Core), select_related/prefetch_related (SQLAlchemy), or Preload() (GORM).',
      sqlBefore: `-- Classic N+1 generated by lazy ORM loops (1 + 50 queries)
SELECT * FROM orders LIMIT 50;
SELECT * FROM order_items WHERE order_id = 1;
SELECT * FROM order_items WHERE order_id = 2;
-- ... repeated 50 times!`,
      sqlAfter: `-- Eager Loading solution (single JOIN query or batched IN clause)
SELECT o.id, o.total, i.id AS item_id, i.product_name, i.price
FROM orders o
LEFT JOIN order_items i ON i.order_id = o.id
WHERE o.id IN (SELECT id FROM orders LIMIT 50);`,
      impact: 'Cuts 51 network round-trips down to 1 consolidated SQL query'
    },
    {
      id: 'cursor-pagination',
      title: '4. Cursor Pagination (Keyset Pagination)',
      badge: 'Performance',
      summary: 'Eliminate deep OFFSET scans to guarantee constant O(1) pagination on massive tables.',
      problem: 'OFFSET 500000 forces the database to read and discard 500,000 rows before returning 20, making deep pages exponentially slower.',
      solution: 'Replace OFFSET with an indexed seek predicate: WHERE id < :cursor ORDER BY id DESC LIMIT 20.',
      sqlBefore: `-- Slow: scans and discards 500k rows before returning page (~850ms)
SELECT id, title, created_at FROM logs
ORDER BY id DESC
OFFSET 500000 LIMIT 20;`,
      sqlAfter: `-- Fast (Keyset Pagination): jumps directly via index (~1.2ms)
-- Client passes the last seen ID from the previous page
SELECT id, title, created_at FROM logs
WHERE id < 4599980
ORDER BY id DESC
LIMIT 20;`,
      impact: 'Constant O(1) lookup time even at page 100,000'
    },
    {
      id: 'caching-strategy',
      title: '5. Strategic Caching (Cache-Aside Pattern)',
      badge: 'Scalability',
      summary: 'Shield the relational primary from repetitive hot reads using an in-memory cache.',
      problem: 'Thousands of concurrent requests execute identical catalog aggregations, saturating database CPU and connection pools.',
      solution: 'Implement Cache-Aside with Redis: check cache first; on miss, query DB, store result with short TTL, and return.',
      sqlBefore: `-- 5,000 req/s hitting PostgreSQL directly:
SELECT c.name, COUNT(p.id) AS total_products
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name;`,
      sqlAfter: `-- Application pseudo-code with Redis Cache-Aside:
-- 1. cached = redis.get("catalog:categories_summary")
-- 2. if (cached) return cached;
-- 3. data = db.query("SELECT c.name, COUNT(p.id) ...")
-- 4. redis.set("catalog:categories_summary", data, EX=300) # 5 min
-- 5. return data;`,
      impact: 'Offloads up to 95% of read throughput from primary database instances'
    },
    {
      id: 'partitioning',
      title: '6. Declarative Table Partitioning',
      badge: 'Big Data',
      summary: 'Split tables exceeding hundreds of millions of rows into manageable time-based partitions.',
      problem: 'Monolithic audit, billing, or telemetry tables grow until active B-Tree indexes no longer fit inside available RAM.',
      solution: 'Partition by date range (Range Partitioning). The query planner uses Partition Pruning to scan only the target month.',
      sqlBefore: `-- Monolithic 200M-row audit table
CREATE TABLE audit_logs (
    id bigserial,
    event_time timestamp not null,
    payload jsonb
);`,
      sqlAfter: `-- Natively partitioned table by date range (PostgreSQL 12+)
CREATE TABLE audit_logs (
    id bigserial,
    event_time timestamp not null,
    payload jsonb
) PARTITION BY RANGE (event_time);

-- Monthly child partitions
CREATE TABLE audit_logs_2024_01 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE audit_logs_2024_02 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');`,
      impact: 'Enables Partition Pruning and instant DROP TABLE data archival'
    }
  ]
};

export default stacksEn;
