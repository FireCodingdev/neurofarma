import { supabaseAdmin } from '@/lib/supabase-server';
import {
  DEFAULT_HOME_CONTENT,
  mergeWithDefaults,
  type HomeContent,
} from '@/lib/home-content';

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('data')
      .eq('key', 'home')
      .maybeSingle();

    // Log para diagnóstico — visível nos logs da Vercel (Functions tab)
    console.log('[getHomeContent] error:', error);
    console.log('[getHomeContent] data:', JSON.stringify(data));

    if (error) {
      console.error('[getHomeContent] Supabase error, usando defaults:', error.message);
      return DEFAULT_HOME_CONTENT;
    }

    // data pode ser null (linha não encontrada) ou { data: {} } (vazio)
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