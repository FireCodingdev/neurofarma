import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase-server';

async function getApoiadorStatus(): Promise<{ logado: boolean; apoiador: boolean }> {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { logado: false, apoiador: false };
  const { data } = await supabaseAdmin
    .from('clientes')
    .select('apoiador')
    .eq('user_id', session.user.id)
    .single();
  return { logado: true, apoiador: data?.apoiador === true };
}

/** GET /api/relatorios/[id]/download — baixa PDF com verificação de paywall */
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: rel, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('slug, titulo, pdf_url, exclusivo_apoiador')
      .eq('slug', params.id)
      .eq('status', 'publicado')
      .single();

    if (error || !rel || !rel.pdf_url) {
      return NextResponse.json({ error: 'PDF não disponível.' }, { status: 404 });
    }

    if (rel.exclusivo_apoiador) {
      const { logado, apoiador } = await getApoiadorStatus();
      if (!logado) {
        return NextResponse.json({ error: 'Autenticação necessária.' }, { status: 401 });
      }
      if (!apoiador) {
        return NextResponse.json({ error: 'Conteúdo exclusivo para apoiadores.' }, { status: 403 });
      }
    }

    // Proxy o arquivo para forçar download com nome correto
    const response = await fetch(rel.pdf_url);
    if (!response.ok) {
      return NextResponse.json({ error: 'Erro ao acessar o PDF.' }, { status: 502 });
    }
    const buffer = await response.arrayBuffer();
    const filename = `${rel.slug}.pdf`;

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('[GET /api/relatorios/[id]/download]', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
