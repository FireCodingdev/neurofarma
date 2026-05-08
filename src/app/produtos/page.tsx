import { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabaseAdmin } from '@/lib/supabase-server';
import type { ProdutoDB } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Produtos · Neurofarma',
  description: 'Formulações farmacêuticas à base de Cannabis medicinal desenvolvidas pela Neurofarma.',
};

async function getProdutos(): Promise<ProdutoDB[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('*')
      .eq('ativo', true)
      .order('ordem', { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-widest">Formulações</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Formulações farmacêuticas de Cannabis medicinal desenvolvidas com rigor científico
            e fabricadas em laboratório certificado.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {produtos.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">Nenhum produto disponível no momento.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {produtos.map((produto) => (
              <Card key={produto.id} hoverable className="flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{produto.categoria}</span>
                    <h2 className="font-display text-xl font-bold text-neutral-900">{produto.nome}</h2>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed mb-5 flex-1">
                  {produto.descricao_curta}
                </p>

                <div className="mb-5">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Indicações</p>
                  <div className="flex flex-wrap gap-1.5">
                    {produto.indicacoes.slice(0, 3).map((ind) => (
                      <span key={ind} className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium">
                        {ind}
                      </span>
                    ))}
                    {produto.indicacoes.length > 3 && (
                      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-full">
                        +{produto.indicacoes.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <Link href={`/produtos/${produto.slug}`}>
                  <Button variant="outline" className="w-full group">
                    Ver ficha completa
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}