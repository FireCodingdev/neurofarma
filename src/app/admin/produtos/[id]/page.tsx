import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProdutoForm } from '@/components/forms/ProdutoForm';
import { PRODUTOS_MOCK } from '@/lib/constants';

export const metadata: Metadata = { title: 'Editar Produto · Admin Neurofarma' };

export default function EditarProdutoPage({ params }: { params: { id: string } }) {
  // TODO: substituir por query Supabase quando a tabela `produtos` estiver criada
  const produto = PRODUTOS_MOCK.find((p) => p.id === params.id);
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
