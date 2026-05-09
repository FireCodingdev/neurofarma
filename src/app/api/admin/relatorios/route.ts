import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase-server';

async function ensureAdmin() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false as const, status: 401, msg: 'Não autenticado.' };
  if (session.user.app_metadata?.role !== 'admin') {
    return { ok: false as const, status: 403, msg: 'Acesso restrito a administradores.' };
  }
  return { ok: true as const };
}

/** GET /api/admin/relatorios — lista todos os relatórios */
export async function GET() {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('id, slug, titulo, subtitulo, status, data_publicacao, criado_em, categorias')
      .order('criado_em', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ relatorios: data ?? [] });
  } catch (err: any) {
    console.error('[GET /api/admin/relatorios]', err);
    return NextResponse.json({ error: 'Erro ao buscar relatórios.' }, { status: 500 });
  }
}

/** POST /api/admin/relatorios — cria novo relatório */
export async function POST(req: NextRequest) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const { titulo, slug, subtitulo, imagem_capa, corpo, categorias, status, data_publicacao } = body;

  if (!titulo || !slug) {
    return NextResponse.json({ error: 'titulo e slug são obrigatórios.' }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .insert({
        titulo,
        slug,
        subtitulo: subtitulo ?? '',
        imagem_capa: imagem_capa ?? '',
        corpo: corpo ?? '',
        categorias: Array.isArray(categorias) ? categorias : (categorias ?? '').split(',').map((c: string) => c.trim()).filter(Boolean),
        status: status ?? 'rascunho',
        data_publicacao: data_publicacao || null,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Já existe um relatório com esse slug.' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ relatorio: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/admin/relatorios]', err);
    return NextResponse.json({ error: 'Erro ao criar relatório.', details: err?.message }, { status: 500 });
  }
}
