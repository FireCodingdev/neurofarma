'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type StatusPedido = 'Em preparo' | 'Enviado' | 'Entregue' | 'Cancelado';

const STATUS_STYLE: Record<string, string> = {
  'Em preparo': 'bg-yellow-100 text-yellow-700',
  'Enviado':    'bg-blue-100 text-blue-700',
  'Entregue':  'bg-green-100 text-green-700',
  'Cancelado': 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS: StatusPedido[] = ['Em preparo', 'Enviado', 'Entregue', 'Cancelado'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchPedidos = () => {
    setLoading(true);
    fetch('/api/admin/pedidos')
      .then((r) => r.json())
      .then((json) => setPedidos(json.pedidos ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPedidos(); }, []);

  const handleStatus = async (id: string, status: StatusPedido) => {
    setUpdating(id);
    await fetch(`/api/admin/pedidos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setPedidos((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
    setUpdating(null);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Pedidos</h1>
          <p className="text-neutral-500 mt-1">Gerencie e atualize o status dos pedidos.</p>
        </div>
        <Button size="sm" variant="outline" onClick={fetchPedidos}>
          <RefreshCw className="w-4 h-4 mr-2" /> Atualizar
        </Button>
      </div>

      {loading ? (
        <Card className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </Card>
      ) : pedidos.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingCart className="w-14 h-14 text-neutral-300 mb-4" />
          <p className="font-semibold text-neutral-700 text-lg">Nenhum pedido ainda</p>
          <p className="text-sm text-neutral-500 mt-1">Os pedidos aparecerão aqui conforme forem criados.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['Pedido', 'Produto', 'Qtd.', 'Cliente', 'Data', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, i) => (
                <tr key={pedido.id} className={i !== pedidos.length - 1 ? 'border-b border-neutral-100' : ''}>
                  <td className="px-5 py-4 font-mono text-xs text-neutral-500">{pedido.numero}</td>
                  <td className="px-5 py-4 font-medium text-neutral-900">{pedido.produto_nome}</td>
                  <td className="px-5 py-4 text-neutral-600">{pedido.quantidade}</td>
                  <td className="px-5 py-4 text-neutral-600 text-xs">
                    {pedido.clientes?.nome ?? '—'}<br />
                    <span className="text-neutral-400">{pedido.clientes?.email ?? ''}</span>
                  </td>
                  <td className="px-5 py-4 text-neutral-500 text-xs">{formatDate(pedido.created_at)}</td>
                  <td className="px-5 py-4">
                    <select
                      value={pedido.status}
                      disabled={updating === pedido.id}
                      onChange={(e) => handleStatus(pedido.id, e.target.value as StatusPedido)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 ${STATUS_STYLE[pedido.status] ?? 'bg-neutral-100 text-neutral-600'}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
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
