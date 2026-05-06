-- =============================================================
--  NEUROFARMA — Setup Supabase
--  Execute no SQL Editor do seu projeto: supabase.com → SQL Editor
-- =============================================================

-- 1. Tabela de profissionais (vinculada ao auth.users do Supabase)
create table if not exists public.profissionais (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,

  -- dados do formulário de cadastro
  nome        text not null,
  crm         text not null,
  especialidade text not null,
  email       text not null unique,
  telefone    text,

  -- controle interno
  aprovado    boolean default false,
  plano       text default 'essencial',
  criado_em   timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- 2. Row Level Security — cada profissional lê/edita apenas seus dados
alter table public.profissionais enable row level security;

create policy "Profissional lê o próprio perfil"
  on public.profissionais for select
  using (auth.uid() = user_id);

create policy "Profissional atualiza o próprio perfil"
  on public.profissionais for update
  using (auth.uid() = user_id);

-- 3. Trigger para manter atualizado_em sincronizado
create or replace function public.set_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

create trigger trg_profissionais_atualizado_em
  before update on public.profissionais
  for each row execute function public.set_atualizado_em();

-- 4. Índice para buscas por email
create index if not exists idx_profissionais_email on public.profissionais(email);
