import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FlaskConical, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { supabaseAdmin } from '@/lib/supabase-server';
import { ProdutoAcao } from '@/components/sections/ProdutoAcao';
import type { ProdutoDB } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

async function getProduto(slug: string): Promise<ProdutoDB | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('*')
      .eq('slug', slug)
      .eq('ativo', true)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

async function getOutrosProdutos(excludeSlug: string): Promise<ProdutoDB[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('*')
      .eq('ativo', true)
      .neq('slug', excludeSlug)
      .order('ordem', { ascending: true })
      .limit(3);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const produto = await getProduto(params.slug);
  if (!produto) return { title: 'Produto não encontrado' };
  return {
    title: `${produto.nome} · Neurofarma`,
    description: produto.descricao_curta,
  };
}

export default async function ProdutoPage({ params }: Props) {
  const produto = await getProduto(params.slug);
  if (!produto) notFound();

  const outros = await getOutrosProdutos(params.slug);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/produtos" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Todos os produtos
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">{produto.categoria}</span>
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900">{produto.nome}</h1>
                <p className="text-neutral-600 mt-1">{produto.descricao_curta}</p>
              </div>
            </div>

            <Card>
              <h2 className="font-display text-lg font-semibold text-neutral-900 mb-3">Sobre o produto</h2>
              <p className="text-neutral-600 leading-relaxed">{produto.descricao}</p>
            </Card>

            <Card>
              <h2 className="font-display text-lg font-semibold text-neutral-900 mb-3">Composição</h2>
              <p className="text-neutral-600 text-sm leading-relaxed font-mono bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                {produto.composicao}
              </p>
            </Card>

            <Card>
              <h2 className="font-display text-lg font-semibold text-neutral-900 mb-3">Apresentação e armazenamento</h2>
              <p className="text-neutral-600 text-sm leading-relaxed">{produto.apresentacao}</p>
            </Card>
          </div>

          <div className="space-y-5">
            <Card>
              <h2 className="font-display text-base font-semibold text-neutral-900 mb-4">Indicações clínicas</h2>
              <ul className="space-y-2">
                {produto.indicacoes.map((ind) => (
                  <li key={ind} className="flex items-center gap-2 text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {ind}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Card de ação - usa componente client para detectar sessão */}
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-0">
              <h3 className="font-display text-base font-semibold mb-2">Tem interesse?</h3>
              <p className="text-sm text-primary-100 mb-4">
                Entre em contato ou faça seu pedido diretamente pela plataforma.
              </p>
              <ProdutoAcao
                produto={{
                  id: produto.id,
                  nome: produto.nome,
                  categoria: produto.categoria,
                }}
              />
            </Card>

            <div className="text-xs text-neutral-500 leading-relaxed px-1">
              Este produto é fabricado mediante prescrição médica e regulamentação Anvisa (RDC 327/2019). Não é dispensado sem receituário.
            </div>
          </div>
        </div>

        {outros.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-semibold text-neutral-900 mb-6">Outros produtos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {outros.map((p) => (
                <Link key={p.id} href={`/produtos/${p.slug}`}>
                  <Card hoverable className="flex items-start gap-3 p-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{p.nome}</p>
                      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{p.descricao_curta}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
