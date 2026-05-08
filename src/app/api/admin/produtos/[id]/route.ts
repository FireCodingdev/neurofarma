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

/** PATCH /api/admin/produtos/[id] — atualiza produto */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const { nome, slug, categoria, descricaoCurta, descricao, composicao, indicacoes, apresentacao, ativo, ordem, imagens } = body;

  const patch: Record<string, any> = {};
  if (nome !== undefined) patch.nome = nome;
  if (slug !== undefined) patch.slug = slug;
  if (categoria !== undefined) patch.categoria = categoria;
  if (descricaoCurta !== undefined) patch.descricao_curta = descricaoCurta;
  if (descricao !== undefined) patch.descricao = descricao;
  if (composicao !== undefined) patch.composicao = composicao;
  if (indicacoes !== undefined) {
    patch.indicacoes = Array.isArray(indicacoes)
      ? indicacoes
      : indicacoes.split('\n').filter(Boolean);
  }
  if (apresentacao !== undefined) patch.apresentacao = apresentacao;
  if (ativo !== undefined) patch.ativo = ativo;
  if (ordem !== undefined) patch.ordem = ordem;
  if (imagens !== undefined) patch.imagens = Array.isArray(imagens) ? imagens : [];

  try {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .update(patch)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug já em uso por outro produto.' }, { status: 409 });
      }
      throw error;
    }
    if (!data) return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 });

    return NextResponse.json({ produto: data });
  } catch (err: any) {
    console.error('[PATCH /api/admin/produtos/[id]]', err);
    return NextResponse.json({ error: 'Erro ao atualizar produto.', details: err?.message }, { status: 500 });
  }
}

/** DELETE /api/admin/produtos/[id] — remove produto */
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  try {
    const { error } = await supabaseAdmin
      .from('produtos')
      .delete()
      .eq('id', params.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[DELETE /api/admin/produtos/[id]]', err);
    return NextResponse.json({ error: 'Erro ao remover produto.', details: err?.message }, { status: 500 });
  }
}
