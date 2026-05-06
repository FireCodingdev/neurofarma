'use client';

import { useState } from 'react';
import { FlaskConical, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PRODUTOS_MOCK } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function NovoPedidoPage() {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState('');
  const [enviado, setEnviado] = useState(false);

  const produtos = PRODUTOS_MOCK.filter((p) => p.ativo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selecionado) return;
    // TODO: integrar com Supabase — inserir na tabela `pedidos`
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="p-6 lg:p-8 max-w-xl flex flex-col items-center justify-center min-h-[60vh] text-center">
        <CheckCircle2 className="w-16 h-16 text-primary-500 mb-6" />
        <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">Pedido enviado!</h2>
        <p className="text-neutral-600 mb-6">Nossa equipe receberá sua solicitação e entrará em contato em breve.</p>
        <Button onClick={() => { setEnviado(false); setSelecionado(null); setQuantidade(1); setObservacoes(''); }}>
          Fazer outro pedido
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Novo Pedido</h1>
        <p className="text-neutral-500 mt-1">Selecione o produto desejado e informe os detalhes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product selection */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">Selecione o produto</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {produtos.map((produto) => (
              <button
                key={produto.id}
                type="button"
                onClick={() => setSelecionado(produto.id)}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all',
                  selecionado === produto.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 bg-white hover:border-primary-300'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  selecionado === produto.id ? 'bg-primary-500' : 'bg-primary-100'
                )}>
                  <FlaskConical className={cn('w-5 h-5', selecionado === produto.id ? 'text-white' : 'text-primary-600')} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 text-sm">{produto.nome}</p>
                  <p className="text-xs text-primary-600 font-medium">{produto.categoria}</p>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{produto.descricaoCurta}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantidade" className="block text-sm font-semibold text-neutral-700 mb-2">
            Quantidade
          </label>
          <input
            id="quantidade"
            type="number"
            min={1}
            max={10}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-28 px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="observacoes" className="block text-sm font-semibold text-neutral-700 mb-2">
            Observações <span className="font-normal text-neutral-400">(opcional)</span>
          </label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={3}
            placeholder="Informe prescrição médica, dosagem específica ou outras observações..."
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
          />
        </div>

        <Button type="submit" size="lg" disabled={!selecionado}>
          Enviar pedido
        </Button>
      </form>
    </div>
  );
}
