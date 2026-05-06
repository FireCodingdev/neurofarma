import { Metadata } from 'next';
import { ProdutoForm } from '@/components/forms/ProdutoForm';

export const metadata: Metadata = { title: 'Novo Produto · Admin Neurofarma' };

export default function NovoProdutoPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Novo Produto</h1>
        <p className="text-neutral-500 mt-1">Preencha os dados da nova formulação.</p>
      </div>
      <ProdutoForm />
    </div>
  );
}
