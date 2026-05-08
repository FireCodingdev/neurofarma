# NEUROFARMA — Contexto do Projeto

## Visão Geral

Site institucional + CRM administrativo de uma farmácia de Cannabis medicinal.
**Stack:** Next.js 14.2.5 (App Router) · TypeScript · Tailwind CSS · Supabase · Vercel

**URL em produção:** https://neurofarma.vercel.app  
**Repositório:** github.com/FireCodingdev/neurofarma (branch `main`)

---

## Variáveis de Ambiente (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=        # URL do projeto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Chave pública (anon/publishable key)
SUPABASE_SERVICE_ROLE_KEY=       # Chave secreta (service_role) — ignora RLS
NEXT_PUBLIC_SITE_URL=            # http://localhost:3000 em dev
```

---

## Banco de Dados — Supabase

### Tabelas existentes

**`produtos`**
```sql
id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
slug          text UNIQUE NOT NULL
nome          text NOT NULL
categoria     text NOT NULL DEFAULT 'CBD Isolado'
descricao_curta text NOT NULL DEFAULT ''
descricao     text NOT NULL DEFAULT ''
composicao    text NOT NULL DEFAULT ''
indicacoes    text[] NOT NULL DEFAULT '{}'
apresentacao  text NOT NULL DEFAULT ''
ativo         boolean NOT NULL DEFAULT true
ordem         integer NOT NULL DEFAULT 0
created_at    timestamptz DEFAULT now()
updated_at    timestamptz DEFAULT now()
```

**`pedidos`** — pedidos de clientes  
**`clientes`** — dados cadastrais dos usuários  
**`site_content`** — conteúdo editável da home page (JSON único com chave `home`)

### Autenticação
- Gerenciada pelo Supabase Auth
- `app_metadata.role === 'admin'` define acesso ao CRM
- Esse campo só pode ser setado via `service_role` (não é forjável pelo usuário)

### RLS (Row Level Security)
- A tabela `produtos` tem 2 policies ativas
- O código usa `supabaseAdmin` (service_role) para contornar RLS nas rotas admin e nas páginas públicas que precisam de dados

---

## Arquitetura de Clientes Supabase

### `src/lib/supabase.ts` — Client Component (browser)
```ts
import { createBrowserClient } from '@supabase/ssr'
export const supabase = createBrowserClient(URL, ANON_KEY)
```
Usado em: Navbar (auth state), LoginForm, CadastroForm

### `src/lib/supabase-server.ts` — Server Component / API Routes
```ts
import { createClient } from '@supabase/supabase-js'
export const supabaseAdmin = createClient(URL, SERVICE_ROLE_KEY)
```
Usado em: todas as páginas admin, API routes, páginas públicas de produtos, NavbarWrapper

---

## Estrutura de Rotas

### Páginas Públicas
| Rota | Arquivo | Dados |
|------|---------|-------|
| `/` | `src/app/page.tsx` | Seções da home (Supabase `site_content`) |
| `/produtos` | `src/app/produtos/page.tsx` | Supabase `produtos` (force-dynamic) |
| `/produtos/[slug]` | `src/app/produtos/[slug]/page.tsx` | Supabase `produtos` (force-dynamic) |
| `/login` | `src/app/login/page.tsx` | — |
| `/cadastro` | `src/app/cadastro/page.tsx` | — |

### Painel Admin (protegido por middleware + layout)
| Rota | Arquivo | Função |
|------|---------|--------|
| `/admin` | `src/app/admin/page.tsx` | Dashboard com métricas |
| `/admin/produtos` | `src/app/admin/produtos/page.tsx` | Listagem de produtos |
| `/admin/produtos/novo` | `src/app/admin/produtos/novo/page.tsx` | Criar produto |
| `/admin/produtos/[id]` | `src/app/admin/produtos/[id]/page.tsx` | Editar produto |
| `/admin/pedidos` | `src/app/admin/pedidos/page.tsx` | Listagem de pedidos |
| `/admin/usuarios` | `src/app/admin/usuarios/page.tsx` | Listagem de usuários |
| `/admin/conteudo` | `src/app/admin/conteudo/page.tsx` | Editar conteúdo da home |
| `/admin/configuracoes` | `src/app/admin/configuracoes/page.tsx` | Configurações do sistema |

### API Routes (todas em `/src/app/api/`)
| Rota | Métodos | Função |
|------|---------|--------|
| `/api/admin/produtos` | GET, POST | Listar / criar produto |
| `/api/admin/produtos/[id]` | GET, PUT, DELETE | Ler / editar / deletar produto |
| `/api/admin/pedidos` | GET | Listar pedidos |
| `/api/admin/pedidos/[id]` | PUT | Atualizar status do pedido |
| `/api/admin/usuarios` | GET | Listar usuários |
| `/api/admin/home-content` | GET, POST | Ler / salvar conteúdo da home |
| `/api/cadastro` | POST | Registrar novo usuário |
| `/api/conta/pedidos` | GET | Pedidos do usuário logado |
| `/api/conta/configuracoes` | GET, PUT | Perfil do usuário logado |

---

## Proteção de Rotas

### Middleware (`middleware.ts`)
- Intercepta todas as rotas que começam com `/admin`
- Verifica sessão Supabase; redireciona para `/login?next=/admin` se não autenticado
- **Não verifica se é admin** — essa verificação é feita no `AdminLayout`

### `src/app/admin/layout.tsx`
- Verifica sessão E `app_metadata.role === 'admin'`
- Redireciona para `/` se não for admin
- Tem `export const dynamic = 'force-dynamic'` e `export const revalidate = 0`

---

## Componentes de Layout

### `NavbarWrapper` (Server Component)
`src/components/layout/NavbarWrapper.tsx`
- Busca produtos do Supabase via `supabaseAdmin`
- Passa como prop para `<Navbar produtos={produtos} />`
- Importado no `src/app/layout.tsx` raiz

### `Navbar` (Client Component — `'use client'`)
`src/components/layout/Navbar.tsx`
- Recebe `produtos: ProdutoDB[]` como prop
- Gerencia estado do usuário via `supabase.auth.onAuthStateChange`
- Dropdown de produtos no header vem do Supabase (não mais do mock)
- Menu mobile inclui os mesmos produtos

### `AdminSidebar` (Client Component)
`src/components/layout/AdminSidebar.tsx`
- Sidebar escura do painel admin
- Links para todas as seções do CRM

---

## Paleta de Cores (Tailwind)

### `primary` — Verde floresta (cor principal do site)
```
50:  #f0fdf4    100: #dcfce7    200: #bbf7d0
300: #86efac    400: #4ade80    500: #3a7d5a
600: #2d6a4f    700: #1f5c40    800: #154d35    900: #0d3d28
```

### `neutral` — Escala de cinzas neutra
```
50: #fafafa   100: #f5f5f5   200: #e5e5e5   300: #d4d4d4
400: #a3a3a3  500: #737373   600: #525252   700: #404040
800: #262626  900: #171717   950: #0a0a0a
```

### Fontes
- `font-sans` / `font-display` → Inter (via Google Fonts)
- Playfair Display também carregada (variável `--font-playfair`) mas não muito usada

---

## Conteúdo Editável da Home

O conteúdo de todas as seções da landing page é editável pelo admin via `/admin/conteudo`.

**Fonte de dados:** `src/lib/home-content.ts`  
**Estrutura:** tipo `HomeContent` com 5 seções:
- `hero` — título, subtítulo, badge, CTAs, trust indicators
- `benefits` — 3 pilares com título, descrição e 3 detalhes cada
- `science` — parágrafos sobre a ciência
- `steps` — 4 etapas do processo
- `joinCta` — CTA final com 3 features

**Funcionamento:**
1. Admin edita pelo formulário em `/admin/conteudo`
2. Salvo como JSON único na tabela `site_content` (chave `home`)
3. A home (`src/app/page.tsx`) busca via `home-content-server.ts` e faz merge com `DEFAULT_HOME_CONTENT`
4. `mergeWithDefaults()` garante compatibilidade — campos não editados usam o padrão

---

## Produtos — Fluxo Completo

```
Supabase DB (tabela `produtos`)
    ↓ supabaseAdmin
NavbarWrapper → Navbar (dropdown do header)   ← atualiza automaticamente
    ↓ supabaseAdmin
/produtos (page.tsx)                           ← atualiza automaticamente
    ↓ supabaseAdmin
/produtos/[slug] (page.tsx)                    ← atualiza automaticamente
    ↓ supabaseAdmin (service_role)
/admin/produtos (CRM — edição)                 ← fonte de verdade
```

**Importante:** Não existe mais `PRODUTOS_MOCK` sendo usado em nenhuma página de renderização. O mock ainda existe em `src/lib/constants.ts` mas não é importado por nenhuma página ativa.

---

## Cache / Revalidação

Todas as páginas admin e públicas de produtos têm:
```ts
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

O `next.config.mjs` também define headers `Cache-Control: no-store` para `/admin/*` e `/api/*`.

---

## Componentes UI (`src/components/ui/`)

- **`Button`** — variants: `primary`, `secondary`, `outline`, `ghost` | sizes: `sm`, `md`, `lg`
- **`Card`** — wrapper com borda e sombra. Prop `hoverable` para efeito hover
- **`Input`** — input estilizado com label e mensagem de erro
- **`Select`** — select estilizado com label

---

## Formulários (`src/components/forms/`)

Todos usam `react-hook-form` + `zod` para validação.

- **`LoginForm`** — login com email/senha via Supabase Auth
- **`CadastroForm`** — cadastro de novo usuário
- **`ProdutoForm`** — criar/editar produto (usado em `/admin/produtos/novo` e `/admin/produtos/[id]`)
- **`ConteudoHomeForm`** — editar conteúdo da landing page

---

## Seções da Home (`src/components/sections/`)

- **`Hero`** — seção principal com fundo escuro e imagem
- **`Benefits`** — 3 pilares de benefícios
- **`Science`** — texto sobre cannabis medicinal
- **`Steps`** — 4 etapas do processo
- **`JoinCta`** — CTA final para cadastro

---

## Problemas Já Resolvidos (histórico)

1. `postcss.config.js` tinha conteúdo do `tsconfig.json` → corrigido
2. `package-lock.json` corrompido → removido (Vercel gera um novo)
3. Pacote `cookie` faltando → adicionado ao `package.json`
4. `tailwind.config.ts` vazio → recriado com paleta `primary` verde e `neutral`
5. `supabaseAdmin` sem `SUPABASE_SERVICE_ROLE_KEY` na Vercel → variável adicionada
6. Cache agressivo no admin → `force-dynamic` + headers `no-store`
7. Navbar usando `PRODUTOS_MOCK` → migrada para Supabase via `NavbarWrapper`
8. Páginas públicas de produtos usando mock → migradas para Supabase

---

## O que Ainda Usa Dados Mock / Hardcoded

- `src/lib/constants.ts` — `PRODUTOS_MOCK` existe mas não é usado em nenhuma página ativa
- `SITE_CONFIG` em `constants.ts` — nome, email, telefone, redes sociais (hardcoded)
- WhatsApp CTA nos produtos aponta fixo para `5574981064385`
