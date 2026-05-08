import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase-server';

const STATUS_VALIDOS = ['Recebido', 'Em preparo', 'Saiu para entrega', 'Entregue', 'Cancelado'] as const;

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

/** PATCH /api/admin/pedidos/[id] — atualiza status do pedido */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const { status, observacoes } = body;

  if (status && !STATUS_VALIDOS.includes(status)) {
    return NextResponse.json(
      { error: `Status inválido. Use: ${STATUS_VALIDOS.join(', ')}` },
      { status: 400 }
    );
  }

  const patch: Record<string, any> = {};
  if (status) patch.status = status;
  if (observacoes !== undefined) patch.observacoes = observacoes;

  try {
    const { data, error } = await supabaseAdmin
      .from('pedidos')
      .update(patch)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Pedido não encontrado.' }, { status: 404 });

    return NextResponse.json({ pedido: data });
  } catch (err: any) {
    console.error('[PATCH /api/admin/pedidos/[id]]', err);
    return NextResponse.json({ error: 'Erro ao atualizar pedido.', details: err?.message }, { status: 500 });
  }
}
