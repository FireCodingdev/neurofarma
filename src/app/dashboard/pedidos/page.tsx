import { Metadata } from 'next';
import { PackageSearch } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Meus Pedidos · Neurofarma' };

const PEDIDOS_MOCK = [
  { id: 'NF-001', produto: 'Neuro-C10', quantidade: 2, status: 'Em preparo', data: '02/05/2026' },
  { id: 'NF-002', produto: 'Neuro-Caps', quantidade: 1, status: 'Enviado', data: '15/04/2026' },
  { id: 'NF-003', produto: 'Neuro-Balance', quantidade: 1, status: 'Entregue', data: '01/04/2026' },
];

const STATUS_COLORS: Record<string, string> = {
  'Em preparo': 'bg-yellow-100 text-yellow-700',
  'Enviado': 'bg-blue-100 text-blue-700',
  'Entregue': 'bg-green-100 text-green-700',
  'Cancelado': 'bg-red-100 text-red-700',
};

export default function PedidosPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Meus Pedidos</h1>
          <p className="text-neutral-500 mt-1">Acompanhe o status dos seus pedidos.</p>
        </div>
        <Link href="/dashboard/novo-pedido">
          <Button size="sm">Novo pedido</Button>
        </Link>
      </div>

      {PEDIDOS_MOCK.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <PackageSearch className="w-12 h-12 text-neutral-300 mb-4" />
          <p className="font-semibold text-neutral-700">Nenhum pedido ainda</p>
          <p className="text-sm text-neutral-500 mt-1 mb-6">Faça seu primeiro pedido agora mesmo.</p>
          <Link href="/dashboard/novo-pedido">
            <Button>Fazer pedido</Button>
          </Link>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Pedido</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Produto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:table-cell">Qtd.</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Data</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {PEDIDOS_MOCK.map((pedido, i) => (
                <tr key={pedido.id} className={i !== PEDIDOS_MOCK.length - 1 ? 'border-b border-neutral-100' : ''}>
                  <td className="px-5 py-4 font-mono text-xs text-neutral-500">{pedido.id}</td>
                  <td className="px-5 py-4 font-medium text-neutral-900">{pedido.produto}</td>
                  <td className="px-5 py-4 text-neutral-600 hidden sm:table-cell">{pedido.quantidade}</td>
                  <td className="px-5 py-4 text-neutral-500 hidden md:table-cell">{pedido.data}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[pedido.status] ?? 'bg-neutral-100 text-neutral-600'}`}>
                      {pedido.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
