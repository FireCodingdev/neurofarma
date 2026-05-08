'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PackageSearch, ChevronDown, ChevronUp, Clock, CreditCard, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type StatusPedido = 'Recebido' | 'Em preparo' | 'Saiu para entrega' | 'Entregue' | 'Cancelado';

interface Pedido {
  id: string;
  numero: string;
  user_id: string;
  produto_id: string | null;
  produto_nome: string;
  quantidade: number;
  metodo_pagamento?: string;
  endereco_entrega?: {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  status: StatusPedido;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG: Record<StatusPedido | string, { color: string; dot: string; step: number }> = {
  'Recebido':          { color: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500',   step: 1 },
  'Em preparo':        { color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500', step: 2 },
  'Saiu para entrega': { color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', step: 3 },
  'Entregue':          { color: 'bg-green-100 text-green-700',   dot: 'bg-green-500',  step: 4 },
  'Cancelado':         { color: 'bg-red-100 text-red-700',       dot: 'bg-red-500',    step: 0 },
};

const STEPS = ['Recebido', 'Em preparo', 'Saiu para entrega', 'Entregue'];

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function StatusBar({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status];
  if (!cfg || cfg.step === 0) return null;

  return (
    <div className="flex items-center gap-1 mt-3">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const active = cfg.step >= stepNum;
        return (
          <div key={step} className="flex items-center gap-1 flex-1">
            <div className={`h-1.5 flex-1 rounded-full transition-all ${active ? cfg.dot : 'bg-neutral-200'}`} />
            {i < STEPS.length - 1 && null}
          </div>
        );
      })}
    </div>
  );
}

function PedidoRow({ pedido }: { pedido: Pedido }) {
  const [aberto, setAberto] = useState(false);
  const cfg = STATUS_CONFIG[pedido.status] ?? { color: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400', step: 0 };

  const endereco = pedido.endereco_entrega;
  const temEndereco = endereco && (endereco.logradouro || endereco.cidade);

  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        className="w-full text-left px-5 py-4 hover:bg-neutral-50 transition-colors"
        onClick={() => setAberto((a) => !a)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
            <div className="min-w-0">
              <p className="font-semibold text-neutral-900 text-sm truncate">{pedido.produto_nome}</p>
              <p className="text-xs text-neutral-400 font-mono">{pedido.numero}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
              {pedido.status}
            </span>
            <span className="text-xs text-neutral-400 hidden sm:block">
              {formatDateTime(pedido.created_at)}
            </span>
            {aberto
              ? <ChevronUp className="w-4 h-4 text-neutral-400" />
              : <ChevronDown className="w-4 h-4 text-neutral-400" />
            }
          </div>
        </div>
        {pedido.status !== 'Cancelado' && (
          <StatusBar status={pedido.status} />
        )}
      </button>

      {aberto && (
        <div className="px-5 pb-5 bg-neutral-50 border-t border-neutral-100">
          <div className="pt-4 grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Data / Hora</p>
                <p className="text-sm text-neutral-700 mt-0.5">{formatDateTime(pedido.created_at)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Pagamento</p>
                <p className="text-sm text-neutral-700 mt-0.5">{pedido.metodo_pagamento ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <PackageSearch className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Quantidade</p>
                <p className="text-sm text-neutral-700 mt-0.5">{pedido.quantidade} unidade(s)</p>
              </div>
            </div>
          </div>

          {temEndereco && (
            <div className="mt-4 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Endereço de entrega</p>
                <p className="text-sm text-neutral-700 mt-0.5">
                  {[
                    endereco?.logradouro,
                    endereco?.numero,
                    endereco?.complemento,
                    endereco?.cidade,
                    endereco?.estado,
                    endereco?.cep,
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          )}

          {pedido.observacoes && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
              <p className="text-xs font-semibold text-yellow-700 mb-1">Observação do atendente</p>
              <p className="text-sm text-yellow-800">{pedido.observacoes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/conta/pedidos')
      .then((r) => r.json())
      .then((json) => setPedidos(json.pedidos ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <Card className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </Card>
        ) : pedidos.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-20 text-center">
            <PackageSearch className="w-14 h-14 text-neutral-300 mb-4" />
            <p className="font-semibold text-neutral-700 text-lg">Nenhum pedido ainda</p>
            <p className="text-sm text-neutral-500 mt-1 mb-6">
              Explore nossos produtos e faça seu primeiro pedido.
            </p>
            <Link href="/produtos">
              <Button>Ver produtos</Button>
            </Link>
          </Card>
        ) : (
          <Card className="overflow-hidden p-0">
            {pedidos.map((pedido) => (
              <PedidoRow key={pedido.id} pedido={pedido} />
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
