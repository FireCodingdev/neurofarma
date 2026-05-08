import { NextResponse } from 'next/server';
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

/** GET /api/admin/pedidos — lista todos os pedidos (admin) */
export async function GET() {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  try {
    const { data, error } = await supabaseAdmin
      .from('pedidos')
      .select('*, clientes(nome, email)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ pedidos: data ?? [] });
  } catch (err: any) {
    console.error('[GET /api/admin/pedidos]', err);
    return NextResponse.json({ error: 'Erro ao buscar pedidos.', details: err?.message }, { status: 500 });
  }
}
