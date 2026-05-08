import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase-server';

async function getSession() {
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
  return session;
}

/** GET /api/conta/pedidos — retorna pedidos do usuário logado */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });

  try {
    const { data, error } = await supabaseAdmin
      .from('pedidos')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ pedidos: data ?? [] });
  } catch (err: any) {
    console.error('[GET /api/conta/pedidos]', err);
    return NextResponse.json({ error: 'Erro ao buscar pedidos.', details: err?.message }, { status: 500 });
  }
}
