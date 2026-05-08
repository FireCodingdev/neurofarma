'use client';

import { useState } from 'react';
import {
  X, ShoppingCart, CheckCircle2, Loader2, Package,
  QrCode, CreditCard, Landmark, Banknote,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ModalPedidoProps {
  produto: {
    id: string;
    nome: string;
    categoria: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const METODOS_PAGAMENTO = [
  { value: 'PIX',               label: 'PIX',               desc: 'Aprovação imediata',                Icon: QrCode     },
  { value: 'Cartão de Crédito', label: 'Cartão de Crédito', desc: 'Em até 12x',                       Icon: CreditCard },
  { value: 'Cartão de Débito',  label: 'Cartão de Débito',  desc: 'Débito à vista',                    Icon: Landmark   },
  { value: 'Espécie',           label: 'Espécie',           desc: 'Disponível para entregas na região', Icon: Banknote   },
];

export function ModalPedido({ produto, onClose, onSuccess }: ModalPedidoProps) {
  const [quantidade, setQuantidade] = useState(1);
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async () => {
    if (!metodoPagamento) {
      setErro('Selecione um método de pagamento.');
      return;
    }
    setErro('');
    setLoading(true);

    try {
      const res = await fetch('/api/conta/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: produto.id,
          produto_nome: produto.nome,
          quantidade,
          metodo_pagamento: metodoPagamento,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Erro ao criar pedido.');

      setSucesso(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2500);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-white">Fazer Pedido</h2>
                <p className="text-primary-100 text-sm mt-0.5 line-clamp-1">{produto.nome}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {sucesso ? (
          <div className="px-6 py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900">Pedido realizado!</h3>
            <p className="text-neutral-500 text-sm mt-2">
              Seu pedido foi registrado com sucesso. Acompanhe o status na aba <strong>Pedidos</strong>.
            </p>
          </div>
        ) : (
          <div className="px-6 py-6 space-y-6">

            {/* Quantidade */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Quantidade
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border-2 border-neutral-200 flex items-center justify-center text-lg font-bold text-neutral-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center text-xl font-bold text-neutral-900">
                  {quantidade}
                </span>
                <button
                  onClick={() => setQuantidade((q) => Math.min(99, q + 1))}
                  className="w-10 h-10 rounded-xl border-2 border-neutral-200 flex items-center justify-center text-lg font-bold text-neutral-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
                >
                  +
                </button>
                <span className="text-sm text-neutral-400 ml-1">unidade(s)</span>
              </div>
            </div>

            {/* Método de pagamento */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Método de pagamento
              </label>
              <div className="grid grid-cols-2 gap-2">
                {METODOS_PAGAMENTO.map(({ value, label, desc, Icon }) => {
                  const selected = metodoPagamento === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setMetodoPagamento(value)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        selected ? 'bg-primary-100' : 'bg-neutral-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${selected ? 'text-primary-600' : 'text-neutral-500'}`} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold leading-tight ${selected ? 'text-primary-700' : 'text-neutral-800'}`}>
                          {label}
                        </p>
                        <p className="text-xs text-neutral-400 leading-tight mt-0.5">{desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Resumo do pedido</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Produto</span>
                  <span className="font-medium text-neutral-900 text-right max-w-[60%] truncate">{produto.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Quantidade</span>
                  <span className="font-medium text-neutral-900">{quantidade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Pagamento</span>
                  <span className="font-medium text-neutral-900">{metodoPagamento || '—'}</span>
                </div>
              </div>
            </div>

            {erro && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {erro}
              </p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading || !metodoPagamento}
              className="w-full"
              size="md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Confirmar pedido
                </>
              )}
            </Button>

            <p className="text-xs text-center text-neutral-400">
              Mediante prescrição médica · RDC 327/2019
            </p>
          </div>
        )}
      </div>
    </div>
  );
}