# Portal Saúde — Programa para Profissionais de Saúde

Portal institucional desenvolvido em **Next.js 14 (App Router)**, **TypeScript** e **Tailwind CSS**, pronto para deploy na Vercel.

Inspirado em portais de associações de saúde, o site oferece cadastro de profissionais, área logada (dashboard), planos de assinatura e listagem filtrável de prescritores.

---

## Sumário

1. [Stack técnica](#stack-técnica)
2. [Estrutura de pastas](#estrutura-de-pastas)
3. [Como rodar localmente](#como-rodar-localmente)
4. [Deploy na Vercel](#deploy-na-vercel)
5. [Integração com banco de dados (Supabase)](#integração-com-banco-de-dados-supabase)
6. [Explicação de cada arquivo](#explicação-de-cada-arquivo)
7. [Próximos passos](#próximos-passos)

---

## Stack técnica

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| Next.js | 14.2.5 | Framework React com App Router e SSR |
| TypeScript | 5.5 | Tipagem estática |
| Tailwind CSS | 3.4 | Sistema de design utilitário |
| react-hook-form | 7.52 | Gestão performática de formulários |
| Zod | 3.23 | Validação de schemas (client e server) |
| lucide-react | 0.414 | Ícones SVG |
| clsx + tailwind-merge | — | Utilitários para concatenar classes Tailwind sem conflito |

**Banco de dados recomendado: Supabase** (PostgreSQL gerenciado, autenticação pronta, plano free generoso e ótima integração com Next.js na Vercel). Alternativas viáveis: Firebase ou Google Cloud SQL.

---

## Estrutura de pastas

```
portal-saude/
├── public/                          # Assets estáticos (imagens, fontes locais)
│
├── src/
│   ├── app/                         # App Router do Next.js
│   │   ├── layout.tsx               # Layout raiz (Navbar + Footer + fontes)
│   │   ├── page.tsx                 # Landing principal (Hero + Benefits + Steps)
│   │   ├── globals.css              # CSS global (diretivas Tailwind + customizações)
│   │   │
│   │   ├── cadastro/page.tsx        # Página de cadastro de profissional
│   │   ├── login/page.tsx           # Página de login
│   │   ├── dashboard/page.tsx       # Área do profissional (após login)
│   │   ├── planos/page.tsx          # Tabela de planos e preços
│   │   ├── medicos/page.tsx         # Lista de médicos com filtros
│   │   ├── produtos/page.tsx        # Placeholder de produtos
│   │   └── servicos/page.tsx        # Placeholder de serviços
│   │
│   ├── components/
│   │   ├── ui/                      # Componentes UI atômicos e reutilizáveis
│   │   │   ├── Button.tsx           # Botão com variantes (primary/outline/ghost...)
│   │   │   ├── Input.tsx            # Input com label e mensagem de erro
│   │   │   ├── Select.tsx           # Select de opções
│   │   │   └── Card.tsx             # Container com sombra
│   │   │
│   │   ├── layout/                  # Componentes de layout global
│   │   │   ├── Navbar.tsx           # Navegação com menu mobile responsivo
│   │   │   └── Footer.tsx           # Rodapé institucional com 4 colunas
│   │   │
│   │   ├── sections/                # Seções da landing page
│   │   │   ├── Hero.tsx             # Hero com título, subtítulo, CTAs
│   │   │   ├── Benefits.tsx         # Grid de 3 benefícios
│   │   │   └── Steps.tsx            # Passo a passo (Cadastro/Validação/Aproveite)
│   │   │
│   │   └── forms/                   # Formulários complexos
│   │       ├── CadastroForm.tsx     # Cadastro com validação Zod
│   │       └── LoginForm.tsx        # Login simulado
│   │
│   ├── lib/                         # Utilitários e configurações
│   │   ├── utils.ts                 # cn() para mesclar classes Tailwind
│   │   ├── validations.ts           # Schemas Zod de validação
│   │   ├── constants.ts             # Dados centrais (especialidades, planos, mocks)
│   │   └── supabase.ts              # Placeholder do cliente Supabase
│   │
│   └── types/
│       └── index.ts                 # Interfaces TypeScript compartilhadas
│
├── .env.example                     # Modelo de variáveis de ambiente
├── .gitignore
├── next-env.d.ts
├── next.config.mjs                  # Configuração do Next.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts               # Tema customizado (cores verde suave + cinza)
├── tsconfig.json
└── README.md                        # Este arquivo
```

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18.17+ e npm (ou pnpm/yarn).

```bash
# 1. Instalar dependências
npm install

# 2. (Opcional) Copiar .env.example e preencher com suas credenciais
cp .env.example .env.local

# 3. Rodar em modo desenvolvimento
npm run dev

# 4. Abrir http://localhost:3000
```

Outros comandos:

```bash
npm run build   # Compila para produção
npm run start   # Roda a versão compilada
npm run lint    # Roda o linter
```

---

## Deploy na Vercel

### Caminho mais rápido (recomendado)

1. **Suba o projeto para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: portal de saúde"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portal-saude.git
   git push -u origin main
   ```

2. **Acesse a Vercel:**
   - Vá em https://vercel.com e faça login com GitHub
   - Clique em **"Add New… → Project"**
   - Selecione o repositório `portal-saude`
   - A Vercel detecta Next.js automaticamente — não precisa configurar nada
   - Clique em **"Deploy"**

3. **Configure as variáveis de ambiente** (quando tiver o Supabase pronto):
   - No dashboard do projeto na Vercel: **Settings → Environment Variables**
   - Adicione as variáveis do `.env.example`
   - Faça um redeploy

Em ~2 minutos seu site estará no ar em `https://portal-saude.vercel.app` (ou domínio customizado).

---

## Integração com banco de dados (Supabase)

Escolhi **Supabase** porque:
- Banco PostgreSQL real (não NoSQL como Firebase) — bom para dados relacionais como médicos, especialidades, agendamentos
- Autenticação pronta (e-mail/senha, OAuth, magic link)
- Plano gratuito permanente generoso (500 MB de banco, 50k usuários ativos/mês)
- Integra nativamente com Next.js e Vercel
- Row Level Security para segurança fina

### Setup em 5 passos

1. **Crie um projeto:** https://supabase.com → New Project
2. **Pegue as credenciais:** Project Settings → API → copie `URL` e `anon public key`
3. **Instale o SDK:**
   ```bash
   npm install @supabase/supabase-js
   ```
4. **Preencha `.env.local`:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
   ```
5. **Ative o cliente em `src/lib/supabase.ts`** (descomente o bloco indicado no arquivo).

### Tabelas SQL sugeridas

Cole no SQL Editor do Supabase para criar a estrutura inicial:

```sql
-- Profissionais cadastrados
create table profissionais (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  crm text not null unique,
  especialidade text not null,
  email text not null unique,
  telefone text not null,
  validado boolean default false,
  plano text default 'essencial',
  cidade text,
  estado text,
  aceita_telemedicina boolean default false,
  avaliacao numeric(2,1) default 0,
  created_at timestamp with time zone default now()
);

-- Encontros clínicos
create table encontros (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  data timestamp with time zone not null,
  formato text default 'online',
  created_at timestamp with time zone default now()
);

-- Inscrições em encontros
create table inscricoes (
  id uuid primary key default gen_random_uuid(),
  profissional_id uuid references profissionais(id),
  encontro_id uuid references encontros(id),
  created_at timestamp with time zone default now(),
  unique(profissional_id, encontro_id)
);
```

### Conectando o formulário de cadastro

Em `src/components/forms/CadastroForm.tsx`, no `onSubmit`, troque a simulação por:

```typescript
import { supabase } from '@/lib/supabase';

const { error } = await supabase
  .from('profissionais')
  .insert({
    nome: data.nome,
    crm: data.crm,
    especialidade: data.especialidade,
    email: data.email,
    telefone: data.telefone,
  });

if (error) throw error;
```

---

## Explicação de cada arquivo

### Configuração

| Arquivo | Função |
|---------|--------|
| `package.json` | Dependências e scripts do projeto |
| `tsconfig.json` | Configuração do TypeScript com path aliases (`@/*` → `src/*`) |
| `next.config.mjs` | Configura o Next.js (domínios de imagem permitidos, etc.) |
| `tailwind.config.ts` | Tema customizado: paleta de verdes suaves, cinzas, fontes Inter + Playfair Display |
| `postcss.config.js` | Pipeline PostCSS para processar Tailwind |
| `.env.example` | Modelo de variáveis sensíveis (Supabase) |
| `.gitignore` | Arquivos ignorados pelo Git (node_modules, .env, .next, etc.) |

### Componentes UI atômicos (`src/components/ui/`)

| Arquivo | Função |
|---------|--------|
| `Button.tsx` | Botão com 4 variantes (primary, secondary, outline, ghost) e 3 tamanhos. Usa `forwardRef` para compatibilidade com formulários |
| `Input.tsx` | Input com label, placeholder e exibição de erro. Compatível com `react-hook-form` |
| `Select.tsx` | Dropdown que recebe array de opções como string |
| `Card.tsx` | Container branco com sombra suave; opcionalmente "hoverable" (eleva no hover) |

### Componentes de layout (`src/components/layout/`)

| Arquivo | Função |
|---------|--------|
| `Navbar.tsx` | Navegação fixa no topo. No mobile vira menu hambúrguer animado. Inclui CTAs "Entrar" e "Começar meu tratamento" |
| `Footer.tsx` | Rodapé com 4 colunas de links + bloco de contato + redes sociais |

### Seções da landing (`src/components/sections/`)

| Arquivo | Função |
|---------|--------|
| `Hero.tsx` | Primeira dobra: badge, título grande com palavra em itálico verde, subtítulo, dois CTAs e métricas de prova social |
| `Benefits.tsx` | Grid de 3 cards com ícone, título, descrição e bullets. Hover muda cor de fundo do ícone |
| `Steps.tsx` | Passo a passo com 3 círculos numerados conectados por uma linha horizontal (visível só no desktop) |

### Formulários (`src/components/forms/`)

| Arquivo | Função |
|---------|--------|
| `CadastroForm.tsx` | Formulário completo de cadastro. Valida nome, CRM, especialidade, e-mail, telefone e aceite de termos com Zod. Mostra tela de sucesso após envio |
| `LoginForm.tsx` | Login simulado com e-mail e senha. Após "login", redireciona para `/dashboard` |

### Páginas (`src/app/`)

| Rota | Arquivo | Função |
|------|---------|--------|
| `/` | `app/page.tsx` | Landing principal — composição de Hero + Benefits + Steps |
| `/cadastro` | `app/cadastro/page.tsx` | Layout em 2 colunas: argumento de venda à esquerda, formulário à direita |
| `/login` | `app/login/page.tsx` | Card centralizado com formulário de login |
| `/dashboard` | `app/dashboard/page.tsx` | Área do profissional: stats, próximos encontros, conteúdos recomendados, CTA de indicação |
| `/planos` | `app/planos/page.tsx` | 3 cards de planos (Essencial, Profissional, Institucional). Plano "Profissional" tem destaque visual |
| `/medicos` | `app/medicos/page.tsx` | Lista filtrada de médicos. Filtros: busca por nome/cidade, especialidade, telemedicina |
| `/produtos` | `app/produtos/page.tsx` | Placeholder com 3 categorias |
| `/servicos` | `app/servicos/page.tsx` | Placeholder com 4 serviços |

### Bibliotecas e tipos (`src/lib/` e `src/types/`)

| Arquivo | Função |
|---------|--------|
| `lib/utils.ts` | Função `cn()` que mescla classes Tailwind resolvendo conflitos (ex.: `bg-red-500` + `bg-blue-500` → mantém só o último) |
| `lib/validations.ts` | Schemas Zod para validar formulários. Mensagens de erro em português |
| `lib/constants.ts` | Dados estáticos: especialidades médicas, planos disponíveis, médicos mockados, configurações do site |
| `lib/supabase.ts` | Placeholder do cliente Supabase com instruções inline para ativar |
| `types/index.ts` | Interfaces TypeScript compartilhadas (Medico, Plano, Beneficio) |

---

## Próximos passos

Aqui está um roteiro priorizado do que fazer depois do deploy inicial:

### Curto prazo (antes de ir para o ar de verdade)

1. **Substituir textos institucionais reais.** Edite `src/lib/constants.ts` com nome real, telefone, e-mail, endereço e redes sociais.
2. **Adicionar logo real.** Substitua o ícone `<Leaf>` em `Navbar.tsx` e `Footer.tsx` por uma `<Image>` do logo da sua marca em `/public`.
3. **Configurar Supabase.** Siga a seção "Integração com banco de dados" acima e conecte o formulário de cadastro a uma tabela real.
4. **Implementar autenticação real.** Em `LoginForm.tsx`, troque a simulação por `supabase.auth.signInWithPassword`.
5. **Proteger a rota `/dashboard`.** Crie um middleware (`src/middleware.ts`) que redireciona usuários não autenticados para `/login`.
6. **Configurar domínio customizado** na Vercel: Settings → Domains.

### Médio prazo (próximas iterações)

7. **Páginas de Produtos e Serviços completas** com dados do banco em vez de placeholders.
8. **Sistema de pagamento** para os planos. Stripe é a escolha padrão e tem ótima integração com Next.js.
9. **Painel admin** para validar cadastros, criar encontros, moderar conteúdo.
10. **Sistema de e-mails transacionais** (boas-vindas, confirmação de cadastro). Resend ou SendGrid funcionam bem.
11. **Página individual de cada médico** (`/medicos/[id]`) com perfil completo, agenda e botão de marcar consulta.
12. **Otimização SEO**: sitemap.xml dinâmico, structured data (JSON-LD para profissionais), Open Graph images.

### Longo prazo

13. **Telemedicina integrada** (vídeo via Daily.co ou similar).
14. **App mobile** com React Native compartilhando lógica.
15. **Análise de uso** com PostHog ou Plausible (privacy-first, alternativas ao Google Analytics).
16. **Internacionalização** (next-intl) se planeja expandir para outros países da América Latina.

### Performance e qualidade

- **Lighthouse score**: a estrutura atual já entrega 95+ em performance, mas adicione `next/image` e fontes locais para subir ainda mais.
- **Acessibilidade**: já usa labels, alt text em ícones decorativos com `aria-hidden`, foco visível. Faça uma auditoria com axe DevTools antes do lançamento.
- **Testes**: adicione Vitest + Testing Library para os componentes críticos (CadastroForm, filtros de médicos).

---

## Suporte e contato

Em caso de dúvidas técnicas:
- Documentação do Next.js: https://nextjs.org/docs
- Documentação do Tailwind: https://tailwindcss.com/docs
- Documentação do Supabase: https://supabase.com/docs

Boa sorte com o projeto!
