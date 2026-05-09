import { Metadata } from 'next';
import { RelatorioForm } from '@/components/forms/RelatorioForm';

export const metadata: Metadata = { title: 'Novo Relatório · Admin Neurofarma' };

export default function NovoRelatorioPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Novo Relatório Técnico</h1>
        <p className="text-neutral-500 mt-1">Preencha os dados do novo relatório de P&D.</p>
      </div>
      <RelatorioForm />
    </div>
  );
}
