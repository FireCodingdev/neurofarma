import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase-server';

async function ensureAdmin() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false as const, status: 401, msg: 'Não autenticado.' };
  if (session.user.app_metadata?.role !== 'admin') {
    return { ok: false as const, status: 403, msg: 'Acesso restrito a administradores.' };
  }
  return { ok: true as const };
}

/** POST /api/admin/relatorios/upload-pdf — faz upload de PDF para o Supabase Storage */
export async function POST(req: NextRequest) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.msg }, { status: auth.status });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Corpo inválido.' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'Arquivo não enviado.' }, { status: 400 });
  }
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Apenas arquivos PDF são aceitos.' }, { status: 400 });
  }
  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Arquivo excede o limite de 10 MB.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${Date.now()}-${safeName}`;

  const { data, error } = await supabaseAdmin.storage
    .from('relatorios-pdf')
    .upload(storagePath, buffer, {
      contentType: 'application/pdf',
      upsert: false,
    });

  if (error) {
    console.error('[upload-pdf]', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload. Verifique se o bucket "relatorios-pdf" existe no Supabase Storage.' },
      { status: 500 }
    );
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('relatorios-pdf')
    .getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl, path: data.path, nome: file.name });
}
