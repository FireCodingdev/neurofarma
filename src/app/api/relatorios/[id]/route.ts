import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

/** GET /api/relatorios/[id] — relatório por slug (apenas publicados) */
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('*')
      .eq('slug', params.id)
      .eq('status', 'publicado')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Relatório não encontrado.' }, { status: 404 });
    }
    return NextResponse.json({ relatorio: data });
  } catch (err: any) {
    console.error('[GET /api/relatorios/[id]]', err);
    return NextResponse.json({ error: 'Erro ao buscar relatório.' }, { status: 500 });
  }
}
