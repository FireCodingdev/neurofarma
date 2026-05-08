import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import {
  DEFAULT_HOME_CONTENT,
  mergeWithDefaults,
  type HomeContent,
} from '@/lib/home-content';

export async function getHomeContent(): Promise<HomeContent> {
  // Garante que o Next.js 14 não cache esta chamada de forma alguma.
  // force-dynamic na page.tsx controla o segmento, mas não impede o
  // cache de fetch interno do supabase-js quando o cliente é singleton.
  noStore();

  // Cria um cliente fresh a cada chamada para evitar reuso de conexão
  // com resposta cacheada pelo runtime do Next.js.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
      global: {
        // Força o fetch a nunca usar cache — necessário no Next.js 14
        // que extende o fetch nativo com cache automático.
        fetch: (url, options) =>
          fetch(url, { ...options, cache: 'no-store' }),
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('key', 'home')
      .maybeSingle();

    console.log('[getHomeContent] error:', error);
    console.log('[getHomeContent] data:', JSON.stringify(data));

    if (error) {
      console.error('[getHomeContent] Supabase error, usando defaults:', error.message);
      return DEFAULT_HOME_CONTENT;
    }

    if (!data || !data.data || Object.keys(data.data).length === 0) {
      console.log('[getHomeContent] Sem conteúdo salvo, usando defaults');
      return DEFAULT_HOME_CONTENT;
    }

    return mergeWithDefaults(data.data);
  } catch (err) {
    console.error('[getHomeContent] Exceção:', err);
    return DEFAULT_HOME_CONTENT;
  }
}