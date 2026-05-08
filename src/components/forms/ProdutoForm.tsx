'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CATEGORIAS_PRODUTO } from '@/lib/constants';
import type { ProdutoDB } from '@/types';

interface ProdutoFormProps {
  produto?: ProdutoDB;
}

export function ProdutoForm({ produto }: ProdutoFormProps) {
  const router = useRouter();
  const isEdit = !!produto;

  const buildForm = (p?: ProdutoDB) => ({
    nome: p?.nome ?? '',
    slug: p?.slug ?? '',
    categoria: p?.categoria ?? CATEGORIAS_PRODUTO[0],
    descricaoCurta: p?.descricao_curta ?? '',
    descricao: p?.descricao ?? '',
    composicao: p?.composicao ?? '',
    indicacoes: p?.indicacoes?.join('\n') ?? '',
    apresentacao: p?.apresentacao ?? '',
    ativo: p?.ativo ?? true,
    ordem: p?.ordem ?? 0,
  });

  const [form, setForm] = useState(() => buildForm(produto));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [erro, setErro] = useState('');

  // Reinicializa o form sempre que navegar para um produto diferente (client-side navigation)
  useEffect(() => {
    setForm(buildForm(produto));
    setStatus('idle');
    setErro('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produto?.id]);

  const set = (field: string, value: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleNome = (v: string) => {
    set('nome', v);
    if (!isEdit) {
      set('slug', v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErro('');

    const payload = {
      ...form,
      indicacoes: form.indicacoes.split('\n').filter(Boolean),
    };

    try {
      const url = isEdit
        ? `/api/admin/produtos/${produto!.id}`
        : '/api/admin/produtos';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        setErro(json.error ?? 'Erro desconhecido.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/admin/produtos');
        router.refresh();
      }, 1200);
    } catch {
      setErro('Falha de rede. Verifique sua conexão.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
          <span>{erro}</span>
        </div>
      )}

      <Card>
        <h2 className="font-semibold text-neutral-900 mb-5">Informações básicas</h2>
        <div className="space-y-4">
          <Input
            label="Nome do produto"
            value={form.nome}
            onChange={(e) => handleNome(e.target.value)}
            placeholder="Ex: Neuro-C10"
            required
          />
          <Input
            label="Slug (URL)"
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            placeholder="Ex: neuro-c10"
            required
          />
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => set('categoria', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
            >
              {CATEGORIAS_PRODUTO.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Descrição curta</label>
            <textarea
              value={form.descricaoCurta}
              onChange={(e) => set('descricaoCurta', e.target.value)}
              rows={2}
              placeholder="Resumo exibido no dropdown e cards"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-neutral-900 mb-5">Conteúdo da página</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Descrição completa</label>
            <textarea
              value={form.descricao}
              onChange={(e) => set('descricao', e.target.value)}
              rows={5}
              placeholder="Descrição detalhada do produto..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Composição</label>
            <textarea
              value={form.composicao}
              onChange={(e) => set('composicao', e.target.value)}
              rows={3}
              placeholder="Lista de componentes e concentrações..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Indicações <span className="text-neutral-400 font-normal">(uma por linha)</span>
            </label>
            <textarea
              value={form.indicacoes}
              onChange={(e) => set('indicacoes', e.target.value)}
              rows={4}
              placeholder={"Epilepsia refratária\nDor crônica\nAnsiedade"}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Apresentação</label>
            <textarea
              value={form.apresentacao}
              onChange={(e) => set('apresentacao', e.target.value)}
              rows={2}
              placeholder="Como o produto é embalado / armazenado..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-neutral-900 mb-5">Configurações</h2>
        <div className="space-y-4">
          <Input
            label="Ordem de exibição"
            type="number"
            value={form.ordem.toString()}
            onChange={(e) => set('ordem', Number(e.target.value))}
            placeholder="0"
          />
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set('ativo', !form.ativo)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.ativo ? 'bg-primary-500' : 'bg-neutral-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.ativo ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm font-medium text-neutral-700">
              {form.ativo ? 'Produto ativo (visível no site)' : 'Produto inativo (oculto)'}
            </span>
          </label>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'loading' || status === 'success'}>
          {status === 'loading' ? (
            'Salvando...'
          ) : status === 'success' ? (
            <><CheckCircle2 className="w-4 h-4 mr-2" /> Salvo!</>
          ) : (
            isEdit ? 'Salvar alterações' : 'Criar produto'
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}