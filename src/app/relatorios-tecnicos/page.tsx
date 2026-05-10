import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase-server';
import { RelatoriosFiltros } from '@/components/sections/RelatoriosFiltros';
import { RelatoriosLista } from '@/components/sections/RelatoriosLista';

export const metadata: Metadata = {
  title: 'Relatórios Técnicos de P&D · Neurofarma',
  description: 'Relatórios técnicos de pesquisa e desenvolvimento farmacotécnico da Neurofarma em cannabis medicinal.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getCategoriasPublicadas(): Promise<string[]> {
  try {
    const { data } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('categorias')
      .eq('status', 'publicado');
    return Array.from(
      new Set((data ?? []).flatMap((r) => r.categorias ?? []))
    ).sort();
  } catch {
    return [];
  }
}

export default async function RelatoriosTecnicosPage() {
  const categorias = await getCategoriasPublicadas();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-widest">
            Pesquisa & Desenvolvimento
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Relatórios Técnicos
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Publicações científicas e técnicas da Neurofarma sobre formulações à base de cannabis medicinal.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros (precisa de Suspense por usar useSearchParams) */}
        <Suspense fallback={<div className="h-24 bg-neutral-100 rounded-2xl animate-pulse mb-8" />}>
          <RelatoriosFiltros categorias={categorias} />
        </Suspense>

        {/* Lista paginada */}
        <Suspense fallback={
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          </div>
        }>
          <RelatoriosLista />
        </Suspense>
      </div>
    </div>
  );
}
