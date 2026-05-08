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
    // Busca todos os pedidos sem JOIN — funciona mesmo sem registro em clientes
    const { data: pedidos, error } = await supabaseAdmin
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!pedidos || pedidos.length === 0) {
      return NextResponse.json({ pedidos: [] });
    }

    // Coleta os user_ids únicos para buscar dados dos clientes
    const userIds = [...new Set(pedidos.map((p: any) => p.user_id).filter(Boolean))];

    // Tenta buscar dados da tabela clientes (pode não ter registro para todos)
    const { data: clientes } = await supabaseAdmin
      .from('clientes')
      .select('user_id, nome, email, telefone')
      .in('user_id', userIds);

    // Tenta buscar emails do auth.users via service_role (fallback)
    let authUsers: any[] = [];
    try {
      const { data } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
      authUsers = data?.users ?? [];
    } catch {
      // ignora se não tiver permissão
    }

    // Monta mapa de user_id → dados do cliente
    const clienteMap: Record<string, { nome: string; email: string }> = {};

    // Primeiro usa a tabela clientes
    for (const c of clientes ?? []) {
      clienteMap[c.user_id] = { nome: c.nome ?? '—', email: c.email ?? '—' };
    }

    // Complementa com auth.users para user_ids que não têm registro em clientes
    for (const u of authUsers) {
      if (!clienteMap[u.id]) {
        clienteMap[u.id] = {
          nome: u.user_metadata?.nome ?? u.user_metadata?.full_name ?? u.email ?? '—',
          email: u.email ?? '—',
        };
      }
    }

    // Anexa dados do cliente a cada pedido
    const pedidosComCliente = pedidos.map((p: any) => ({
      ...p,
      clientes: clienteMap[p.user_id] ?? { nome: '—', email: '—' },
    }));

    return NextResponse.json({ pedidos: pedidosComCliente });
  } catch (err: any) {
    console.error('[GET /api/admin/pedidos]', err);
    return NextResponse.json({ error: 'Erro ao buscar pedidos.', details: err?.message }, { status: 500 });
  }
}