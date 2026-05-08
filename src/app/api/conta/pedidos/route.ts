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

/** POST /api/conta/pedidos — cria um novo pedido */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const { produto_id, produto_nome, quantidade, metodo_pagamento } = body;

  if (!produto_nome || !quantidade || !metodo_pagamento) {
    return NextResponse.json(
      { error: 'Campos obrigatórios: produto_nome, quantidade, metodo_pagamento.' },
      { status: 400 }
    );
  }

  if (quantidade < 1 || quantidade > 99) {
    return NextResponse.json({ error: 'Quantidade inválida.' }, { status: 400 });
  }

  const METODOS_VALIDOS = ['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'];
  if (!METODOS_VALIDOS.includes(metodo_pagamento)) {
    return NextResponse.json({ error: 'Método de pagamento inválido.' }, { status: 400 });
  }

  // Busca dados de endereço do cliente
  const { data: clienteData } = await supabaseAdmin
    .from('clientes')
    .select('nome, logradouro, numero, complemento, cidade, estado, cep, telefone')
    .eq('user_id', session.user.id)
    .maybeSingle();

  const endereco_entrega = clienteData
    ? {
        logradouro: clienteData.logradouro ?? '',
        numero: clienteData.numero ?? '',
        complemento: clienteData.complemento ?? '',
        cidade: clienteData.cidade ?? '',
        estado: clienteData.estado ?? '',
        cep: clienteData.cep ?? '',
      }
    : {};

  // Gera número de pedido único
  const numero = `NF${Date.now().toString().slice(-8)}`;

  try {
    const { data, error } = await supabaseAdmin
      .from('pedidos')
      .insert({
        numero,
        user_id: session.user.id,
        produto_id: produto_id ?? null,
        produto_nome,
        quantidade: Number(quantidade),
        metodo_pagamento,
        endereco_entrega,
        status: 'Recebido',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ pedido: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/conta/pedidos]', err);
    return NextResponse.json({ error: 'Erro ao criar pedido.', details: err?.message }, { status: 500 });
  }
}
