import { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PLANOS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Planos',
  description: 'Conheça nossos planos para profissionais de saúde.',
};

/**
 * Página /planos
 * Grid de cards com 3 planos: Essencial, Profissional (destacado) e Institucional.
 * Dados centralizados em src/lib/constants.ts.
 */
export default function PlanosPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50/40 via-white to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Escolha o plano ideal{' '}
            <span className="text-primary-600 italic">para você</span>
          </h1>
          <p className="text-lg text-neutral-600">
            Planos flexíveis para profissionais autônomos, clínicas e equipes multiprofissionais.
            Cancele quando quiser.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {PLANOS.map((plano) => (
            <Card
              key={plano.id}
              className={cn(
                'relative flex flex-col p-8',
                plano.destaque && 'border-2 border-primary-500 shadow-card-hover lg:scale-105 lg:-translate-y-2'
              )}
            >
              {plano.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-600 text-white text-xs font-semibold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Mais popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                  {plano.nome}
                </h2>
                <p className="text-neutral-600 text-sm mb-6">
                  {plano.descricao}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-neutral-500">R$</span>
                  <span className="font-display text-5xl font-bold text-neutral-900">
                    {plano.preco}
                  </span>
                  <span className="text-neutral-500">/{plano.periodo}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plano.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary-700" />
                    </div>
                    <span className="text-sm text-neutral-700">{beneficio}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plano.destaque ? 'primary' : 'outline'}
                size="md"
                className="w-full"
              >
                Assinar agora
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="text-center mt-16 pt-8 border-t border-neutral-200 max-w-2xl mx-auto">
          <p className="text-neutral-600">
            Tem dúvidas sobre qual plano escolher?{' '}
            <a href="#" className="text-primary-600 font-medium hover:underline">
              Fale com um consultor
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
