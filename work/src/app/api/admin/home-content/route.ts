import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase-server';
import {
  DEFAULT_HOME_CONTENT,
  mergeWithDefaults,
  type HomeContent,
} from '@/lib/home-content';

/**
 * Autoriza apenas usuários admin (app_metadata.role === 'admin').
 * Importante: validamos via cookie de sessão real, não confiamos no body.
 */
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { ok: false as const, status: 401, msg: 'Não autenticado.' };
  if (session.user.app_metadata?.role !== 'admin') {
    return { ok: false as const, status: 403, msg: 'Acesso restrito a administradores.' };
  }
  return { ok: true as const };
}

/**
 * Validação leve do payload. Não usa zod para evitar dependência adicional;
 * o objetivo é só impedir lixo óbvio. mergeWithDefaults trata o resto.
 */
function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function validatePayload(body: unknown): body is Partial<HomeContent> {
  if (!isPlainObject(body)) return false;
  // Cada seção, se presente, precisa ser um objeto.
  for (const k of ['hero', 'benefits', 'science', 'steps', 'joinCta']) {
    if (k in body && !isPlainObject((body as Record<string, unknown>)[k])) {
      return false;
    }
  }
  return true;
}

// GET — qualquer um pode ler (é o conteúdo público do site).
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('data, updated_at')
      .eq('key', 'home')
      .maybeSingle();

    if (error || !data?.data) {
      return NextResponse.json({
        content: DEFAULT_HOME_CONTENT,
        usingDefaults: true,
      });
    }

    return NextResponse.json({
      content: mergeWithDefaults(data.data),
      usingDefaults: false,
      updated_at: data.updated_at,
    });
  } catch {
    return NextResponse.json({
      content: DEFAULT_HOME_CONTENT,
      usingDefaults: true,
    });
  }
}

// PUT — só admin.
export async function PUT(req: NextRequest) {
  const auth = await ensureAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.msg }, { status: auth.status });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  if (!validatePayload(body)) {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }

  // Faz merge antes de salvar — nunca grava lixo parcial sem os defaults.
  const merged = mergeWithDefaults(body);

  try {
    const { error } = await supabaseAdmin
      .from('site_content')
      .upsert(
        {
          key: 'home',
          data: merged,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      );

    if (error) {
      // Provavelmente a tabela ainda não foi criada.
      console.error('[/api/admin/home-content] upsert error:', error);
      return NextResponse.json(
        {
          error:
            'Não foi possível salvar. Verifique se a tabela `site_content` foi criada no Supabase. Veja o README do CRM.',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, content: merged });
  } catch (err) {
    console.error('[/api/admin/home-content] erro:', err);
    return NextResponse.json(
      { error: 'Erro interno ao salvar o conteúdo.' },
      { status: 500 }
    );
  }
}
