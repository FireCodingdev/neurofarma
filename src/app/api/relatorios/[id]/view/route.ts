import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

/** POST /api/relatorios/[id]/view — incrementa visualizações atomicamente */
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await supabaseAdmin.rpc('increment_rel_views', { p_slug: params.id });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
