import { supabaseAdmin } from '@/lib/supabase-server';
import {
  DEFAULT_HOME_CONTENT,
  mergeWithDefaults,
  type HomeContent,
} from '@/lib/home-content';

/**
 * Busca o conteúdo editável da home do Supabase.
 *
 * Estratégia:
 * 1. Tenta ler a linha `key = 'home'` da tabela `site_content`.
 * 2. Se a tabela não existir, ou a linha não existir, ou der qualquer
 *    erro de leitura → cai para os defaults silenciosamente. O site
 *    NUNCA pode quebrar por causa do CMS.
 * 3. Faz deep-merge com os defaults para tolerar registros antigos
 *    quando novos campos forem adicionados ao schema.
 *
 * Schema esperado da tabela:
 *   create table site_content (
 *     key  text primary key,
 *     data jsonb not null,
 *     updated_at timestamptz default now()
 *   );
 */
export async function getHomeContent(): Promise<HomeContent> {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('data')
      .eq('key', 'home')
      .maybeSingle();

    if (error || !data?.data) {
      return DEFAULT_HOME_CONTENT;
    }

    return mergeWithDefaults(data.data);
  } catch {
    // Tabela não existe, env var faltando, etc — fail safe.
    return DEFAULT_HOME_CONTENT;
  }
}
