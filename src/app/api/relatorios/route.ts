import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

/**
 * GET /api/relatorios
 * Query params:
 *   page     — número da página (default: 1)
 *   limit    — itens por página (default: 9, max: 50)
 *   q        — busca em título e subtítulo
 *   categoria — filtro por categoria exata
 *   ordem    — recentes | antigos | mais-lidos (default: recentes)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page  = Math.max(1, parseInt(searchParams.get('page')  ?? '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '9')));
    const q         = searchParams.get('q')?.trim()         ?? '';
    const categoria = searchParams.get('categoria')?.trim() ?? '';
    const ordem     = searchParams.get('ordem')             ?? 'recentes';
    const offset    = (page - 1) * limit;

    // ── query de contagem total (sem range) ──────────────────────────────────
    let countQ = supabaseAdmin
      .from('relatorios_tecnicos')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'publicado');

    if (q)         countQ = countQ.or(`titulo.ilike.%${q}%,subtitulo.ilike.%${q}%`);
    if (categoria) countQ = countQ.contains('categorias', [categoria]);

    const { count, error: countError } = await countQ;
    if (countError) throw countError;

    // ── query de dados paginados ─────────────────────────────────────────────
    let dataQ = supabaseAdmin
      .from('relatorios_tecnicos')
      .select('id, slug, titulo, subtitulo, imagem_capa, categorias, data_publicacao, visualizacoes, exclusivo_apoiador, pdf_url')
      .eq('status', 'publicado');

    if (q)         dataQ = dataQ.or(`titulo.ilike.%${q}%,subtitulo.ilike.%${q}%`);
    if (categoria) dataQ = dataQ.contains('categorias', [categoria]);

    if (ordem === 'antigos') {
      dataQ = dataQ.order('data_publicacao', { ascending: true });
    } else if (ordem === 'mais-lidos') {
      dataQ = dataQ.order('visualizacoes', { ascending: false });
    } else {
      dataQ = dataQ.order('data_publicacao', { ascending: false });
    }

    dataQ = dataQ.range(offset, offset + limit - 1);

    const { data, error } = await dataQ;
    if (error) throw error;

    const total      = count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      relatorios: data ?? [],
      total,
      page,
      totalPages,
    });
  } catch (err: any) {
    console.error('[GET /api/relatorios]', err);
    return NextResponse.json({ error: 'Erro ao buscar relatórios.', details: err?.message }, { status: 500 });
  }
}
