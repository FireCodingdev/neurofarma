-- Migration 002: campos adicionais em relatorios_tecnicos + apoiador em clientes
-- Execute no SQL Editor do Supabase

-- ── relatorios_tecnicos ──────────────────────────────────────────────────────
ALTER TABLE relatorios_tecnicos
  ADD COLUMN IF NOT EXISTS exclusivo_apoiador boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS pdf_url            text    NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS visualizacoes      integer NOT NULL DEFAULT 0;

-- Índice para "mais lidos"
CREATE INDEX IF NOT EXISTS idx_relatorios_visualizacoes
  ON relatorios_tecnicos (visualizacoes DESC);

-- ── clientes ─────────────────────────────────────────────────────────────────
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS apoiador boolean NOT NULL DEFAULT false;

-- ── função para incremento atômico de visualizações ─────────────────────────
CREATE OR REPLACE FUNCTION increment_rel_views(p_slug text)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE relatorios_tecnicos
  SET visualizacoes = visualizacoes + 1
  WHERE slug = p_slug AND status = 'publicado';
$$;
