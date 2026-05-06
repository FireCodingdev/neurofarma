import { Metadata } from 'next';
import Link from 'next/link';
import { PackageSearch, ShoppingCart, FlaskConical, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PRODUTOS_MOCK } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Área do Paciente · Neurofarma',
};

export default function DashboardPage() {
  const destaques = PRODUTOS_MOCK.filter((p) => p.ativo).slice(0, 3);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900">
          Bem-vindo(a) de volta
        </h1>
        <p className="text-neutral-500 mt-1">Aqui está um resumo da sua conta.</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link href="/dashboard/novo-pedido">
          <Card hoverable className="flex items-center gap-4 p-5">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Novo Pedido</p>
              <p className="text-sm text-neutral-500">Solicitar formulação</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 ml-auto" />
          </Card>
        </Link>
        <Link href="/dashboard/pedidos">
          <Card hoverable className="flex items-center gap-4 p-5">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <PackageSearch className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Meus Pedidos</p>
              <p className="text-sm text-neutral-500">Acompanhar status</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 ml-auto" />
          </Card>
        </Link>
      </div>

      {/* Products highlight */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-neutral-900">Produtos disponíveis</h2>
        <Link href="/produtos" className="text-sm text-primary-600 hover:underline">
          Ver todos
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destaques.map((produto) => (
          <Card key={produto.id} className="p-5">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <FlaskConical className="w-5 h-5 text-primary-600" />
            </div>
            <p className="font-semibold text-neutral-900">{produto.nome}</p>
            <p className="text-xs text-primary-600 font-medium mb-2">{produto.categoria}</p>
            <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{produto.descricaoCurta}</p>
            <Link href={`/produtos/${produto.slug}`}>
              <Button variant="outline" size="sm" className="w-full">
                Ver detalhes
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
