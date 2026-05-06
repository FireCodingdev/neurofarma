import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FlaskConical, CheckCircle2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PRODUTOS_MOCK } from '@/lib/constants';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUTOS_MOCK.filter((p) => p.ativo).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const produto = PRODUTOS_MOCK.find((p) => p.slug === params.slug);
  if (!produto) return { title: 'Produto não encontrado' };
  return {
    title: `${produto.nome} · Neurofarma`,
    description: produto.descricaoCurta,
  };
}

export default function ProdutoPage({ params }: Props) {
  // TODO: substituir por query Supabase quando a tabela `produtos` estiver criada
  const produto = PRODUTOS_MOCK.find((p) => p.slug === params.slug && p.ativo);
  if (!produto) notFound();

  const outros = PRODUTOS_MOCK.filter((p) => p.ativo && p.id !== produto.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Back link */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/produtos" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Todos os produtos
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">{produto.categoria}</span>
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900">{produto.nome}</h1>
                <p className="text-neutral-600 mt-1">{produto.descricaoCurta}</p>
              </div>
            </div>

            {/* Description */}
            <Card>
              <h2 className="font-display text-lg font-semibold text-neutral-900 mb-3">Sobre o produto</h2>
              <p className="text-neutral-600 leading-relaxed">{produto.descricao}</p>
            </Card>

            {/* Composition */}
            <Card>
              <h2 className="font-display text-lg font-semibold text-neutral-900 mb-3">Composição</h2>
              <p className="text-neutral-600 text-sm leading-relaxed font-mono bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                {produto.composicao}
              </p>
            </Card>

            {/* Presentation */}
            <Card>
              <h2 className="font-display text-lg font-semibold text-neutral-900 mb-3">Apresentação e armazenamento</h2>
              <p className="text-neutral-600 text-sm leading-relaxed">{produto.apresentacao}</p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Indications */}
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

            {/* CTA */}
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-0">
              <h3 className="font-display text-base font-semibold mb-2">Tem interesse?</h3>
              <p className="text-sm text-primary-100 mb-4">
                Cadastre-se para solicitar este produto diretamente pela plataforma.
              </p>
              <div className="space-y-2">
                <Link href="/dashboard/novo-pedido">
                  <Button className="w-full bg-white text-primary-700 hover:bg-primary-50 border-0" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Fazer pedido
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" size="sm">
                    Criar cadastro
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Legal notice */}
            <div className="text-xs text-neutral-500 leading-relaxed px-1">
              Este produto é fabricado mediante prescrição médica e regulamentação Anvisa (RDC 327/2019). Não é dispensado sem receituário.
            </div>
          </div>
        </div>

        {/* Other products */}
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
                      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{p.descricaoCurta}</p>
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
