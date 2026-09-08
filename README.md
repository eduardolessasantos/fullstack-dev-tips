# CodeCompare - Blog Técnico Comparativo

> **"Aprenda por comparação, não por decoreba."**

O **CodeCompare** é uma plataforma e blog técnico para desenvolvedores modernos, projetado para resolver o problema de transição entre tecnologias. Em vez de ler tutoriais isolados, você compara lado a lado como a mesma funcionalidade é implementada em diferentes frameworks frontend, linguagens backend e bancos de dados.

---

## 🚀 Tecnologias e Stacks Cobertas

### 1. Frontend (`</>`)
- **React**: Functional components, Hooks (`useState`, `useEffect`, TanStack Query), Zustand/Context.
- **Vue.js**: Vue 3 com Composition API (`<script setup>`, `ref`, `computed`, Pinia).
- **Angular**: Angular 17/18 Standalone Components, Signals (`signal()`, `toSignal()`), HttpClient.

**Tópicos Comparados:**
1. Criação de componente
2. Data Binding e Reatividade
3. Event Handling (click e passagem de parâmetros)
4. Ciclo de vida (`onInit`, `onMounted`, `useEffect`)
5. Requisição HTTP (fetch com tipagem e tratamento de erros)
6. Gerenciamento de Estado Global

### 2. Backend (`server`)
- **.NET 8 (C#)**: Minimal APIs, Controllers, Entity Framework Core, LINQ, DTOs.
- **Java (Spring Boot 3)**: Spring Web, Spring Data JPA, Hibernate, `@RestController`.
- **Python (FastAPI)**: Pydantic v2, SQLAlchemy assíncrono, Rotas tipadas com Type Hints.
- **Go (Golang)**: Fiber/Gin, GORM, Structs, Concorrência e JSON serialization.

**Estrutura de cada stack:**
- Model / Entidade tipada
- Controller / Router RESTful
- Rota `GET /api/users` com paginação e conexão real ao banco de dados

### 3. Banco de Dados (`database`)
- **NoSQL Utilities**: Comparativo direto entre **MongoDB**, **Redis**, **Apache Cassandra** e **Amazon DynamoDB** (Casos de uso, modelo de dados, limitações e exemplos práticos de query).
- **Otimização Relacional**:
  - Índices avançados (B-Tree vs GIN)
  - `EXPLAIN ANALYZE` (identificação de gargalos e buffers)
  - Prevenção do problema N+1 (Eager Loading & Joins)
  - Paginação por Cursor (Keyset Pagination vs OFFSET/LIMIT)
  - Estratégias de Caching (Cache-aside com Redis)
  - Particionamento de Tabelas (Range vs List)

---

## 🔒 Conformidade LGPD & Google AdSense

Este projeto foi construído pronto para monetização com Google AdSense e 100% compatível com a legislação brasileira (LGPD) e europeia (GDPR):

1. **Arquivo `ads.txt`**: Localizado em `/public/ads.txt`, validado para declaração de inventário autorizado:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
2. **Banner de Consentimento LGPD**:
   - Bloqueio automático de scripts de rastreamento até o consentimento explícito.
   - Modal de preferências granulares (Cookies Necessários, Estatísticos e de Publicidade).
   - Armazenamento seguro de consentimento no `localStorage`.
3. **Página de Política de Privacidade**:
   - Explicação transparente de cookies de terceiros, direitos do titular (Art. 18 LGPD) e instruções para opt-out de anúncios personalizados.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+ ou 20+
- npm ou pnpm ou yarn

### Instalação
```bash
# Clone o repositório
git clone git@github.com:eduardolessasantos/blog_fullstack.git
cd blog_fullstack

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em: `http://localhost:3000`

### Build de Produção
```bash
npm run build
npm run preview
```

---

## 📦 Estrutura do Repositório

```text
├── public/
│   └── ads.txt               # Declaração obrigatória para Google AdSense
├── src/
│   ├── App.tsx               # Aplicação principal (Single Page Application responsiva)
│   ├── main.tsx              # Ponto de entrada React
│   └── index.css             # Configurações do Tailwind CSS e fontes
├── index.html                # Entrypoint HTML com fontes Inter e JetBrains Mono
├── package.json              # Dependências e scripts do projeto
├── metadata.json             # Metadados da aplicação
└── README.md                 # Documentação do projeto
```

---

## 🤝 Publicação no GitHub

Para vincular e enviar este projeto ao seu repositório remoto:

```bash
git remote add origin git@github.com:eduardolessasantos/blog_fullstack.git
git branch -M main
git push -u origin main
```

---

*Desenvolvido com foco em código limpo, didática direta e performance.*
