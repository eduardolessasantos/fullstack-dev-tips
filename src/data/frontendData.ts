import { FrontendComparison } from '../types.ts';

export const FRONTEND_COMPARISONS: FrontendComparison[] = [
  {
    id: 'component',
    title: '1. Criação de Componente',
    desc: 'Como declarar, receber propriedades (props/inputs) e exportar um componente básico reutilizável.',
    category: 'Fundamentos',
    codes: {
      angular: {
        lang: 'typescript',
        notes: 'Angular 17+ usa Standalone Components por padrão com a função input() tipada.',
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
  // Input signals reativos do Angular moderno
  readonly name = input.required<string>();
  readonly role = input<string>('Desenvolvedor');
}`
      },
      vue: {
        lang: 'html',
        notes: 'Vue 3 utiliza a sintaxe concisa de <script setup> com macro defineProps().',
        code: `<script setup lang="ts">
// Declaração de props com tipagem TypeScript pura
interface Props {
  name: string;
  role?: string;
}

withDefaults(defineProps<Props>(), {
  role: 'Desenvolvedor'
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
        notes: 'React utiliza funções puras com desestruturação de props e interfaces TypeScript.',
        code: `import React from 'react';

interface UserCardProps {
  name: string;
  role?: string;
}

export function UserCard({ name, role = 'Desenvolvedor' }: UserCardProps) {
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
    title: '2. Data Binding & Reatividade',
    desc: 'Como manter o estado reativo e sincronizar valores primitivos e calculados com o template.',
    category: 'Reatividade',
    codes: {
      angular: {
        lang: 'typescript',
        notes: 'Signals (signal e computed) oferecem reatividade granular sem depender do Zone.js.',
        code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <div class="counter">
      <p>Contador: <strong>{{ count() }}</strong></p>
      <p>Dobro: <span>{{ doubleCount() }}</span></p>
      <input [value]="username()" (input)="onNameChange($event)" />
    </div>
  \`
})
export class CounterComponent {
  // Signal primitivo mutável
  count = signal(0);
  username = signal('Dev');

  // Valor computado reativo
  doubleCount = computed(() => this.count() * 2);

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }
}`
      },
      vue: {
        lang: 'html',
        notes: 'Ref cria referências reativas mutáveis e computed calcula valores derivados com cache.',
        code: `<script setup lang="ts">
import { ref, computed } from 'vue';

// Referência reativa mutável
const count = ref<number>(0);
const username = ref<string>('Dev');

// Valor computado derivado automaticamente
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <div class="counter">
    <p>Contador: <strong>{{ count }}</strong></p>
    <p>Dobro: <span>{{ doubleCount }}</span></p>
    <!-- v-model para two-way data binding nativo -->
    <input v-model="username" />
  </div>
</template>`
      },
      react: {
        lang: 'tsx',
        notes: 'useState gerencia o estado e useMemo calcula valores derivados evitando re-computações.',
        code: `import React, { useState, useMemo } from 'react';

export function Counter() {
  const [count, setCount] = useState<number>(0);
  const [username, setUsername] = useState<string>('Dev');

  // Valor memoizado derivado do count
  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <div className="counter">
      <p>Contador: <strong>{count}</strong></p>
      <p>Dobro: <span>{doubleCount}</span></p>
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
    title: '3. Event Handling (Click & Ações)',
    desc: 'Como escutar cliques, passar parâmetros dinâmicos e manipular o objeto de evento nativo.',
    category: 'Interatividade',
    codes: {
      angular: {
        lang: 'typescript',
        notes: 'Usa a sintaxe de parênteses (click)="handler(param)" e passagem direta de argumentos.',
        code: `@Component({
  selector: 'app-actions',
  standalone: true,
  template: \`
    <div class="actions">
      <!-- Evento simples -->
      <button (click)="increment()">Incrementar</button>

      <!-- Evento com parâmetro e $event nativo -->
      <button (click)="removeItem(item.id, $event)">
        Excluir #{{ item.id }}
      </button>
    </div>
  \`
})
export class ActionsComponent {
  count = signal(0);
  item = { id: 42, title: 'Item Teste' };

  increment() {
    this.count.update(n => n + 1);
  }

  removeItem(id: number, event: MouseEvent) {
    event.stopPropagation();
    console.log('Removendo ID:', id);
  }
}`
      },
      vue: {
        lang: 'html',
        notes: 'Usa a diretiva @click ou v-on:click com suporte a modificadores como .stop e .prevent.',
        code: `<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const item = { id: 42, title: 'Item Teste' };

function increment() {
  count.value++;
}

function removeItem(id: number, e: MouseEvent) {
  console.log('Removendo ID:', id, 'em coordenadas:', e.clientX);
}
</script>

<template>
  <div class="actions">
    <!-- Click direto com modificador de evento nativo -->
    <button @click="increment">Incrementar</button>
    
    <!-- Passagem de parâmetro e evento $event -->
    <button @click.stop="removeItem(item.id, $event)">
      Excluir #{{ item.id }}
    </button>
  </div>
</template>`
      },
      react: {
        lang: 'tsx',
        notes: 'Usa onClick em camelCase recebendo uma função callback ou closure.',
        code: `import React, { useState } from 'react';

export function ActionButtons() {
  const [count, setCount] = useState(0);
  const item = { id: 42, title: 'Item Teste' };

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const removeItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Removendo ID:', id);
  };

  return (
    <div className="flex gap-3">
      <button onClick={increment}>Incrementar</button>
      
      {/* Closure passando id e evento sintético */}
      <button onClick={(e) => removeItem(item.id, e)}>
        Excluir #{item.id}
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
    desc: 'Como executar código quando o componente é montado no DOM e efetuar limpeza (clean-up) ao desmontar.',
    category: 'Ciclo de Vida',
    codes: {
      angular: {
        lang: 'typescript',
        notes: 'Implementa OnInit e OnDestroy (ou a nova função inject(DestroyRef) no Angular moderno).',
        code: `import { Component, OnInit, OnDestroy, inject, DestroyRef } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: \`<p>Tempo ativo: {{ seconds }}s</p>\`
})
export class TimerComponent implements OnInit, OnDestroy {
  seconds = 0;
  private intervalId: any;

  ngOnInit() {
    console.log('Componente montado!');
    this.intervalId = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  ngOnDestroy() {
    console.log('Limpando timer ao desmontar...');
    clearInterval(this.intervalId);
  }
}`
      },
      vue: {
        lang: 'html',
        notes: 'Hooks onMounted e onUnmounted são importados de "vue" para ciclo de vida desacoplado.',
        code: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const seconds = ref(0);
let intervalId: number | undefined;

onMounted(() => {
  console.log('Componente montado no DOM!');
  intervalId = window.setInterval(() => {
    seconds.value++;
  }, 1000);
});

onUnmounted(() => {
  console.log('Limpando intervalo ao desmontar...');
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <p>Tempo ativo: {{ seconds }}s</p>
</template>`
      },
      react: {
        lang: 'tsx',
        notes: 'O Hook useEffect unifica montagem, atualização e limpeza retornando uma função de cleanup.',
        code: `import React, { useState, useEffect } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('Componente montado!');
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Função de limpeza (executada ao desmontar o componente)
    return () => {
      console.log('Limpando intervalo ao desmontar...');
      clearInterval(intervalId);
    };
  }, []); // Array vazio = executa apenas na montagem

  return <p>Tempo ativo: {seconds}s</p>;
}`
      }
    }
  },
  {
    id: 'http',
    title: '5. Requisição HTTP (Fetch de Usuários)',
    desc: 'Consumo de endpoint RESTful (/api/users) com tipagem, estados de loading e tratamento de erros.',
    category: 'Comunicação',
    codes: {
      angular: {
        lang: 'typescript',
        notes: 'Utiliza HttpClient integrado com Signals e rxResource/toSignal para fluxo reativo puro.',
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
      <p>Carregando usuários...</p>
    }
  \`
})
export class UserListComponent {
  private http = inject(HttpClient);

  // Converte Observable em Signal reativo pronto para o template
  users = toSignal(
    this.http.get<User[]>('https://api.example.com/users').pipe(
      catchError(err => {
        console.error('Erro ao buscar:', err);
        return of([]);
      })
    ),
    { initialValue: null }
  );
}`
      },
      vue: {
        lang: 'html',
        notes: 'No ecossistema Vue, useFetch ou fetch nativo assíncrono carrega os dados com clareza.',
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
    if (!response.ok) throw new Error('Falha na resposta HTTP');
    users.value = await response.json();
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUsers);
</script>

<template>
  <p v-if="loading">Carregando usuários...</p>
  <p v-else-if="error" class="text-red-400">Erro: {{ error }}</p>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.name }} ({{ user.email }})
    </li>
  </ul>
</template>`
      },
      react: {
        lang: 'tsx',
        notes: 'Padrão com useEffect + estado (ou useQuery do TanStack Query em aplicações completas).',
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
        if (!res.ok) throw new Error('Erro ao buscar lista');
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
    return () => controller.abort(); // Cancela requisição ao desmontar
  }, []);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p className="text-red-400">Erro: {error}</p>;

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
    title: '6. Gerenciamento de Estado Global',
    desc: 'Compartilhamento de estado entre múltiplos componentes sem prop-drilling (Store global).',
    category: 'Arquitetura',
    codes: {
      angular: {
        lang: 'typescript',
        notes: 'Usa NgRx SignalStore ou Services com Signals injetáveis (providedIn: "root").',
        code: `import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // Estado privado reativo
  private itemsSignal = signal<CartItem[]>([]);

  // Leituras públicas (somente leitura)
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
        notes: 'Pinia é a store oficial recomendada pelo Vue, com suporte a composables reativos.',
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
        notes: 'Zustand é a solução minimalista moderna mais popular (ou React Context para estados simples).',
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

// No componente React:
// const { items, addItem } = useCartStore();`
      }
    }
  }
];
