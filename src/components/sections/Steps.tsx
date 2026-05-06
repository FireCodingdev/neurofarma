import Link from 'next/link';
import { UserPlus, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Passo a passo de adesão ao programa.
 * Layout em 3 colunas conectadas por uma linha guia (apenas desktop).
 */
export function Steps() {
  const passos = [
    {
      numero: '01',
      Icon: UserPlus,
      titulo: 'Cadastro',
      descricao:
        'Preencha o formulário com seus dados profissionais e suas informações de contato. Leva menos de 5 minutos.',
    },
    {
      numero: '02',
      Icon: ShieldCheck,
      titulo: 'Validação',
      descricao:
        'Nossa equipe verifica seu registro profissional junto aos conselhos. O retorno acontece em até 48 horas úteis.',
    },
    {
      numero: '03',
      Icon: Sparkles,
      titulo: 'Aproveite os Benefícios',
      descricao:
        'Acesse todos os recursos do programa: encontros clínicos, conteúdos exclusivos e visibilidade na rede.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Como começar em{' '}
            <span className="text-primary-600">3 passos</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Um processo simples e rápido para você começar a fazer parte da nossa rede.
          </p>
        </div>

        {/* Steps with connector line */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {passos.map((passo) => {
              const Icon = passo.Icon;
              return (
                <div key={passo.numero} className="text-center">
                  {/* Number circle */}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-primary-200 rounded-full animate-pulse opacity-50" />
                    <div className="relative w-24 h-24 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-10 h-10 text-primary-600" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-9 h-9 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center font-display shadow-md">
                      {passo.numero}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-3">
                    {passo.titulo}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed max-w-sm mx-auto">
                    {passo.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/cadastro">
            <Button size="lg">
              Começar agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
