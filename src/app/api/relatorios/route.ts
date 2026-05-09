import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

/** GET /api/relatorios — lista relatórios publicados */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('id, slug, titulo, subtitulo, imagem_capa, categorias, data_publicacao, criado_em')
      .eq('status', 'publicado')
      .order('data_publicacao', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ relatorios: data ?? [] });
  } catch (err: any) {
    console.error('[GET /api/relatorios]', err);
    return NextResponse.json({ error: 'Erro ao buscar relatórios.' }, { status: 500 });
  }
}
