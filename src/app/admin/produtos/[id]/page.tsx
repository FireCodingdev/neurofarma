import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProdutoForm } from '@/components/forms/ProdutoForm';
import { supabaseAdmin } from '@/lib/supabase-server';
import type { ProdutoDB } from '@/types';

export const metadata: Metadata = { title: 'Editar Produto · Admin Neurofarma' };
export const dynamic = 'force-dynamic';

async function getProduto(id: string): Promise<ProdutoDB | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function EditarProdutoPage({ params }: { params: { id: string } }) {
  const produto = await getProduto(params.id);
  if (!produto) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Editar: {produto.nome}</h1>
        <p className="text-neutral-500 mt-1">Altere os dados da formulação e salve.</p>
      </div>
      <ProdutoForm produto={produto} />
    </div>
  );
}
