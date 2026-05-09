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

/** PATCH /api/admin/relatorios/[id] — atualiza relatório */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const { titulo, slug, subtitulo, imagem_capa, corpo, categorias, status, data_publicacao } = body;

  const patch: Record<string, any> = { atualizado_em: new Date().toISOString() };
  if (titulo !== undefined) patch.titulo = titulo;
  if (slug !== undefined) patch.slug = slug;
  if (subtitulo !== undefined) patch.subtitulo = subtitulo;
  if (imagem_capa !== undefined) patch.imagem_capa = imagem_capa;
  if (corpo !== undefined) patch.corpo = corpo;
  if (categorias !== undefined) {
    patch.categorias = Array.isArray(categorias)
      ? categorias
      : categorias.split(',').map((c: string) => c.trim()).filter(Boolean);
  }
  if (status !== undefined) patch.status = status;
  if (data_publicacao !== undefined) patch.data_publicacao = data_publicacao || null;

  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .update(patch)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug já em uso por outro relatório.' }, { status: 409 });
      }
      throw error;
    }
    if (!data) return NextResponse.json({ error: 'Relatório não encontrado.' }, { status: 404 });

    return NextResponse.json({ relatorio: data });
  } catch (err: any) {
    console.error('[PATCH /api/admin/relatorios/[id]]', err);
    return NextResponse.json({ error: 'Erro ao atualizar relatório.', details: err?.message }, { status: 500 });
  }
}

/** DELETE /api/admin/relatorios/[id] — remove relatório */
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  try {
    const { error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .delete()
      .eq('id', params.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[DELETE /api/admin/relatorios/[id]]', err);
    return NextResponse.json({ error: 'Erro ao remover relatório.', details: err?.message }, { status: 500 });
  }
}
