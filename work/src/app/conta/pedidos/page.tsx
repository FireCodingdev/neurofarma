import { Metadata } from 'next';
import Link from 'next/link';
import { PackageSearch } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Meus Pedidos · Neurofarma' };

// TODO: substituir por query Supabase — buscar pedidos do usuário autenticado
const PEDIDOS_MOCK = [
  { id: 'NF-001', produto: 'Neuro-C10', quantidade: 2, status: 'Em preparo', data: '02/05/2026' },
  { id: 'NF-002', produto: 'Neuro-Caps', quantidade: 1, status: 'Enviado', data: '15/04/2026' },
  { id: 'NF-003', produto: 'Neuro-Balance', quantidade: 1, status: 'Entregue', data: '01/04/2026' },
];

const STATUS_STYLE: Record<string, string> = {
  'Em preparo': 'bg-yellow-100 text-yellow-700',
  'Enviado':    'bg-blue-100 text-blue-700',
  'Entregue':  'bg-green-100 text-green-700',
  'Cancelado': 'bg-red-100 text-red-700',
};

export default function MeusPedidosPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <PackageSearch className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-neutral-900">Meus Pedidos</h1>
              <p className="text-sm text-neutral-500">Histórico e status das suas solicitações</p>
            </div>
          </div>
          <Link href="/produtos">
            <Button size="sm" variant="outline">Ver produtos</Button>
          </Link>
        </div>

        {PEDIDOS_MOCK.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-20 text-center">
            <PackageSearch className="w-14 h-14 text-neutral-300 mb-4" />
            <p className="font-semibold text-neutral-700 text-lg">Nenhum pedido ainda</p>
            <p className="text-sm text-neutral-500 mt-1 mb-6">
              Explore nossos produtos e entre em contato para solicitar.
            </p>
            <Link href="/produtos">
              <Button>Ver produtos</Button>
            </Link>
          </Card>
        ) : (
          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  {['Pedido', 'Produto', 'Qtd.', 'Data', 'Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider
                      last:table-cell [&:nth-child(3)]:hidden sm:[&:nth-child(3)]:table-cell [&:nth-child(4)]:hidden md:[&:nth-child(4)]:table-cell">
                      {h}
                    </th>
                  ))}
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
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[pedido.status] ?? 'bg-neutral-100 text-neutral-600'}`}>
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
    </div>
  );
}
