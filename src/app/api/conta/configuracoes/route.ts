import { NextRequest, NextResponse } from 'next/server';
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

/** GET /api/conta/configuracoes — retorna dados do cliente logado */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });

  try {
    const { data, error } = await supabaseAdmin
      .from('clientes')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error) throw error;

    // Se não existir ainda, retorna perfil básico do Auth
    if (!data) {
      return NextResponse.json({
        cliente: {
          nome: session.user.user_metadata?.nome ?? '',
          email: session.user.email ?? '',
        },
      });
    }

    return NextResponse.json({ cliente: data });
  } catch (err: any) {
    console.error('[GET /api/conta/configuracoes]', err);
    return NextResponse.json({ error: 'Erro ao buscar dados.', details: err?.message }, { status: 500 });
  }
}

/** PUT /api/conta/configuracoes — salva/atualiza perfil do cliente */
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const { nome, telefone, cpf, cep, logradouro, numero, complemento, cidade, estado } = body;

  try {
    const { data, error } = await supabaseAdmin
      .from('clientes')
      .upsert(
        {
          user_id: session.user.id,
          email: session.user.email!,
          nome: nome ?? '',
          telefone: telefone ?? null,
          cpf: cpf ?? null,
          cep: cep ?? null,
          logradouro: logradouro ?? null,
          numero: numero ?? null,
          complemento: complemento ?? null,
          cidade: cidade ?? null,
          estado: estado ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ cliente: data });
  } catch (err: any) {
    console.error('[PUT /api/conta/configuracoes]', err);
    return NextResponse.json({ error: 'Erro ao salvar dados.', details: err?.message }, { status: 500 });
  }
}
