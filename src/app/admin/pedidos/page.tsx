'use client';

import { useEffect, useState } from 'react';
import {
  ShoppingCart, RefreshCw, ChevronDown, ChevronUp,
  Clock, CreditCard, MapPin, User, Package, CheckCircle2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type StatusPedido = 'Recebido' | 'Em preparo' | 'Saiu para entrega' | 'Entregue' | 'Cancelado';

const STATUS_OPTIONS: StatusPedido[] = ['Recebido', 'Em preparo', 'Saiu para entrega', 'Entregue', 'Cancelado'];

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string }> = {
  'Recebido':          { color: 'text-blue-700',    bg: 'bg-blue-100',    dot: 'bg-blue-500' },
  'Em preparo':        { color: 'text-yellow-700',  bg: 'bg-yellow-100',  dot: 'bg-yellow-500' },
  'Saiu para entrega': { color: 'text-orange-700',  bg: 'bg-orange-100',  dot: 'bg-orange-500' },
  'Entregue':          { color: 'text-green-700',   bg: 'bg-green-100',   dot: 'bg-green-500' },
  'Cancelado':         { color: 'text-red-700',     bg: 'bg-red-100',     dot: 'bg-red-500' },
};

const NEXT_STATUS: Record<string, StatusPedido | null> = {
  'Recebido':          'Em preparo',
  'Em preparo':        'Saiu para entrega',
  'Saiu para entrega': 'Entregue',
  'Entregue':          null,
  'Cancelado':         null,
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

interface Pedido {
  id: string;
  numero: string;
  produto_nome: string;
  quantidade: number;
  metodo_pagamento?: string;
  endereco_entrega?: Record<string, string>;
  status: StatusPedido;
  observacoes?: string;
  created_at: string;
  clientes?: { nome?: string; email?: string };
}

function PedidoCard({
  pedido,
  onStatusChange,
  updating,
}: {
  pedido: Pedido;
  onStatusChange: (id: string, status: StatusPedido) => void;
  updating: string | null;
}) {
  const [aberto, setAberto] = useState(false);
  const cfg = STATUS_CONFIG[pedido.status] ?? { color: 'text-neutral-600', bg: 'bg-neutral-100', dot: 'bg-neutral-400' };
  const proximo = NEXT_STATUS[pedido.status];
  const isUpdating = updating === pedido.id;

  const endereco = pedido.endereco_entrega ?? {};
  const enderecoFormatado = [
    endereco.logradouro,
    endereco.numero,
    endereco.complemento,
    endereco.cidade,
    endereco.estado,
    endereco.cep,
  ].filter(Boolean).join(', ');

  return (
    <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
      {/* Header do card */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${cfg.dot}`} />
            <div className="min-w-0">
              <p className="font-semibold text-neutral-900 truncate">{pedido.produto_nome}</p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="font-mono text-xs text-neutral-400">{pedido.numero}</span>
                <span className="text-neutral-300">·</span>
                <span className="text-xs text-neutral-500">{pedido.clientes?.nome ?? '—'}</span>
                <span className="text-neutral-300">·</span>
                <span className="text-xs text-neutral-400">{formatDateTime(pedido.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
              {pedido.status}
            </span>
            <button
              onClick={() => setAberto((a) => !a)}
              className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
            >
              {aberto
                ? <ChevronUp className="w-4 h-4 text-neutral-500" />
                : <ChevronDown className="w-4 h-4 text-neutral-500" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Detalhes expandidos */}
      {aberto && (
        <div className="border-t border-neutral-100 bg-neutral-50 px-5 py-4 space-y-4">
          {/* Informações */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Cliente</p>
                <p className="text-sm text-neutral-800 mt-0.5">{pedido.clientes?.nome ?? '—'}</p>
                <p className="text-xs text-neutral-400">{pedido.clientes?.email ?? ''}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Package className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Produto / Qtd.</p>
                <p className="text-sm text-neutral-800 mt-0.5">{pedido.produto_nome}</p>
                <p className="text-xs text-neutral-500">{pedido.quantidade} unidade(s)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Pagamento</p>
                <p className="text-sm text-neutral-800 mt-0.5">{pedido.metodo_pagamento ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Data / Hora</p>
                <p className="text-sm text-neutral-800 mt-0.5">{formatDateTime(pedido.created_at)}</p>
              </div>
            </div>
          </div>

          {enderecoFormatado && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Endereço de entrega</p>
                <p className="text-sm text-neutral-800 mt-0.5">{enderecoFormatado}</p>
              </div>
            </div>
          )}

          {pedido.observacoes && (
            <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
              <p className="text-xs font-semibold text-yellow-700 mb-1">Observações</p>
              <p className="text-sm text-yellow-800">{pedido.observacoes}</p>
            </div>
          )}

          {/* Ações de status */}
          <div className="pt-2 border-t border-neutral-200">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Atualizar status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.filter((s) => s !== pedido.status).map((s) => {
                const sCfg = STATUS_CONFIG[s];
                const isNext = s === proximo;
                return (
                  <button
                    key={s}
                    disabled={isUpdating}
                    onClick={() => onStatusChange(pedido.id, s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border-2 flex items-center gap-1.5 ${
                      isNext
                        ? `${sCfg.bg} ${sCfg.color} border-transparent shadow-sm`
                        : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300'
                    } disabled:opacity-50`}
                  >
                    {isNext && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {s}
                  </button>
                );
              })}
            </div>
            {proximo && (
              <p className="text-xs text-neutral-400 mt-2">
                Próximo passo sugerido: <strong className="text-neutral-600">{proximo}</strong>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>('todos');

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
    try {
      await fetch(`/api/admin/pedidos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setPedidos((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
    } finally {
      setUpdating(null);
    }
  };

  const pedidosFiltrados = filtro === 'todos'
    ? pedidos
    : pedidos.filter((p) => p.status === filtro);

  const contagens = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = pedidos.filter((p) => p.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Pedidos</h1>
          <p className="text-neutral-500 mt-1">
            {pedidos.length} pedido(s) no total
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={fetchPedidos}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Filtros por status */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFiltro('todos')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border-2 ${
            filtro === 'todos'
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
          }`}
        >
          Todos ({pedidos.length})
        </button>
        {STATUS_OPTIONS.map((s) => {
          const cfg = STATUS_CONFIG[s];
          return (
            <button
              key={s}
              onClick={() => setFiltro(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border-2 ${
                filtro === s
                  ? `${cfg.bg} ${cfg.color} border-transparent`
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {s} ({contagens[s] ?? 0})
            </button>
          );
        })}
      </div>

      {loading ? (
        <Card className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </Card>
      ) : pedidosFiltrados.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingCart className="w-14 h-14 text-neutral-300 mb-4" />
          <p className="font-semibold text-neutral-700 text-lg">
            {filtro === 'todos' ? 'Nenhum pedido ainda' : `Nenhum pedido com status "${filtro}"`}
          </p>
          <p className="text-sm text-neutral-500 mt-1">Os pedidos aparecerão aqui conforme forem criados.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {pedidosFiltrados.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              onStatusChange={handleStatus}
              updating={updating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
