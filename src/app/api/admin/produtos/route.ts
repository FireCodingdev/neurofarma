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

/** GET /api/admin/produtos — lista todos os produtos */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('*')
      .order('ordem', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ produtos: data ?? [] });
  } catch (err: any) {
    console.error('[GET /api/admin/produtos]', err);
    return NextResponse.json({ error: 'Erro ao buscar produtos.', details: err?.message }, { status: 500 });
  }
}

/** POST /api/admin/produtos — cria novo produto */
export async function POST(req: NextRequest) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const { nome, slug, categoria, descricaoCurta, descricao, composicao, indicacoes, apresentacao, ativo, ordem, imagens, icone } = body;

  if (!nome || !slug) {
    return NextResponse.json({ error: 'nome e slug são obrigatórios.' }, { status: 400 });
  }

  const insertPayload: Record<string, any> = {
    nome,
    slug,
    categoria: categoria ?? 'CBD Isolado',
    descricao_curta: descricaoCurta ?? '',
    descricao: descricao ?? '',
    composicao: composicao ?? '',
    indicacoes: Array.isArray(indicacoes) ? indicacoes : (indicacoes ?? '').split('\n').filter(Boolean),
    apresentacao: apresentacao ?? '',
    ativo: ativo ?? true,
    ordem: ordem ?? 0,
    imagens: Array.isArray(imagens) ? imagens : [],
    icone: icone ?? null,
  };

  try {
    let result = await supabaseAdmin
      .from('produtos')
      .insert(insertPayload)
      .select()
      .single();

    // Se falhou e o payload contém 'icone', a coluna pode não existir ainda.
    // Tenta novamente sem 'icone' para não bloquear a criação do produto.
    if (result.error && insertPayload.icone !== undefined) {
      const { icone: _removed, ...payloadSemIcone } = insertPayload;
      result = await supabaseAdmin
        .from('produtos')
        .insert(payloadSemIcone)
        .select()
        .single();
    }

    const { data, error } = result;

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Já existe um produto com esse slug.' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ produto: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/admin/produtos]', err);
    return NextResponse.json({ error: 'Erro ao criar produto.', details: err?.message }, { status: 500 });
  }
}
