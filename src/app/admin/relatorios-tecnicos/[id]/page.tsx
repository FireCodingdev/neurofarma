import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RelatorioForm } from '@/components/forms/RelatorioForm';
import { supabaseAdmin } from '@/lib/supabase-server';
import type { RelatorioTecnico } from '@/types';

export const metadata: Metadata = { title: 'Editar Relatório · Admin Neurofarma' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getRelatorio(id: string): Promise<RelatorioTecnico | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function EditarRelatorioPage({ params }: { params: { id: string } }) {
  const relatorio = await getRelatorio(params.id);
  if (!relatorio) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Editar Relatório</h1>
        <p className="text-neutral-500 mt-1 truncate max-w-xl">{relatorio.titulo}</p>
      </div>
      <RelatorioForm relatorio={relatorio} />
    </div>
  );
}
