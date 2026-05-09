-- Tabela: relatorios_tecnicos
-- Execute no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS relatorios_tecnicos (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text        UNIQUE NOT NULL,
  titulo           text        NOT NULL,
  subtitulo        text        DEFAULT '',
  imagem_capa      text        DEFAULT '',
  corpo            text        DEFAULT '',
  categorias       text[]      DEFAULT '{}',
  status           text        NOT NULL DEFAULT 'rascunho'
                               CHECK (status IN ('rascunho', 'publicado')),
  data_publicacao  date,
  criado_em        timestamptz NOT NULL DEFAULT now(),
  atualizado_em    timestamptz NOT NULL DEFAULT now()
);

-- Índice para listagem pública (publicados, ordenados por data)
CREATE INDEX IF NOT EXISTS idx_relatorios_status_data
  ON relatorios_tecnicos (status, data_publicacao DESC);

-- Trigger para atualizar atualizado_em automaticamente
CREATE OR REPLACE FUNCTION update_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_relatorios_atualizado_em ON relatorios_tecnicos;
CREATE TRIGGER trg_relatorios_atualizado_em
  BEFORE UPDATE ON relatorios_tecnicos
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em();

-- RLS: leitura pública de publicados; escrita apenas via service_role (supabaseAdmin)
ALTER TABLE relatorios_tecnicos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "relatorios_public_read" ON relatorios_tecnicos;
CREATE POLICY "relatorios_public_read"
  ON relatorios_tecnicos FOR SELECT
  USING (status = 'publicado');
