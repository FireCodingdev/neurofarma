# CMS de conteúdo da home — guia rápido

Este recurso permite ao admin alterar todos os textos das 5 seções da página
inicial sem mexer em código.

## O que foi adicionado

| Caminho | Função |
|---|---|
| `src/lib/home-content.ts` | Tipos + valores padrão de todos os textos editáveis |
| `src/lib/home-content-server.ts` | Helper server-side que lê do Supabase com fallback |
| `src/app/api/admin/home-content/route.ts` | API `GET` (público) e `PUT` (só admin) |
| `src/app/admin/conteudo/page.tsx` | Página `/admin/conteudo` no painel |
| `src/components/forms/ConteudoHomeForm.tsx` | Formulário grande organizado em 5 cards |

As 5 seções (`Hero`, `Benefits`, `Science`, `Steps`, `JoinCta`) foram
refatoradas para receber o conteúdo via prop, com fallback para os defaults.
A `src/app/page.tsx` agora busca o conteúdo no Supabase no server e injeta
nos componentes.

## Setup necessário no Supabase

Crie a tabela uma única vez (SQL Editor):

```sql
create table site_content (
  key        text primary key,
  data       jsonb not null,
  updated_at timestamptz default now()
);

-- (opcional) RLS — leitura pública, escrita só via service role
alter table site_content enable row level security;

create policy "site_content leitura pública"
  on site_content for select
  using (true);

-- A escrita acontece sempre via API com service role, então não precisa
-- de policy de update/insert para usuários comuns.
```

Importante: enquanto a tabela não existir, **o site continua funcionando
normalmente** com os textos padrão — o helper trata o erro silenciosamente.
Só a página `/admin/conteudo` mostrará uma mensagem de erro ao tentar salvar.

## Como funciona o título quebrado em 3 partes

Os títulos grandes têm uma palavra em verde/itálico no meio. Para o admin
controlar exatamente qual trecho fica destacado, cada título é dividido em
três campos:

- **parte 1** — texto antes do destaque (com espaço no fim)
- **destaque** — a palavra/frase em verde
- **parte 2** — texto depois do destaque (com espaço no começo) — só existe no Hero

Exemplo do Hero:
```
"A ciência da " + "cannabis" + " a serviço da vida."
```

O formulário avisa o admin sobre os espaços para evitar que o texto fique
grudado.

## Permissões

- `GET /api/admin/home-content` é público (qualquer um pode ler).
- `PUT /api/admin/home-content` exige sessão com `app_metadata.role = 'admin'`,
  validado server-side via cookie de sessão. Não dá para forjar pelo client.

## Cache

A `src/app/page.tsx` está com `export const dynamic = 'force-dynamic'`. Isso
garante que cada visita ao site reflete o conteúdo mais recente. Se a operação
crescer e isso virar gargalo, basta trocar para
`export const revalidate = 60` (cache de 60s) sem mexer em mais nada.
