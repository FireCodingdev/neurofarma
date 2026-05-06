import { Metadata } from 'next';
import { Package, ShoppingBag, Truck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Conheça os produtos disponíveis para profissionais e pacientes.',
};

/**
 * Página /produtos (placeholder estruturado).
 * Pronta para receber dados reais de produtos vindos do Supabase
 * ou de uma API de e-commerce.
 */
export default function ProdutosPage() {
  const categorias = [
    {
      Icon: Package,
      titulo: 'Produtos Clínicos',
      descricao:
        'Insumos, materiais e produtos para uso em consultório e clínicas.',
      qtd: '+120 itens',
    },
    {
      Icon: ShoppingBag,
      titulo: 'Para Pacientes',
      descricao:
        'Produtos prescritos com retirada na rede credenciada ou entrega domiciliar.',
      qtd: '+80 itens',
    },
    {
      Icon: Truck,
      titulo: 'Logística',
      descricao:
        'Serviço de entrega rastreada e armazenamento em condições ideais.',
      qtd: 'Brasil todo',
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Nossos <span className="text-primary-600 italic">Produtos</span>
          </h1>
          <p className="text-lg text-neutral-600">
            Tudo que você precisa para um cuidado completo, com a qualidade que sua prática merece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categorias.map((cat) => {
            const Icon = cat.Icon;
            return (
              <Card key={cat.titulo} hoverable>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2">
                  {cat.titulo}
                </h3>
                <p className="text-neutral-600 mb-4">{cat.descricao}</p>
                <span className="text-sm text-primary-700 font-medium">
                  {cat.qtd}
                </span>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-600 mb-4">
            Esta página está em construção. Catálogo completo em breve.
          </p>
          <Button variant="outline">Receber novidades</Button>
        </div>
      </div>
    </div>
  );
}
