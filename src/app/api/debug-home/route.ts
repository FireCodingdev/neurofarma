import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

// ROTA TEMPORÁRIA DE DIAGNÓSTICO — remover após identificar o problema
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceKeyPrefix = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20) + '...';

  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('data')
      .eq('key', 'home')
      .maybeSingle();

    return NextResponse.json({
      env: { url, hasServiceKey, serviceKeyPrefix },
      supabase: { data, error },
    });
  } catch (err: any) {
    return NextResponse.json({
      env: { url, hasServiceKey, serviceKeyPrefix },
      exception: err?.message,
    });
  }
}
