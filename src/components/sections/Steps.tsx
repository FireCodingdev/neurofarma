import Link from 'next/link';
import { Leaf, FlaskConical, BadgeCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Steps() {
  const etapas = [
    {
      numero: '01',
      Icon: Leaf,
      titulo: 'Cultivo e Extração',
      descricao:
        'A biomassa vegetal é cultivada em ambiente controlado e certificado. A extração dos canabinoides segue protocolos validados para garantir pureza e reprodutibilidade.',
    },
    {
      numero: '02',
      Icon: FlaskConical,
      titulo: 'Desenvolvimento',
      descricao:
        'Os extratos são formulados por farmacêuticos especialistas, ajustando concentrações, excipientes e forma farmacêutica para cada indicação clínica.',
    },
    {
      numero: '03',
      Icon: BadgeCheck,
      titulo: 'Controle de Qualidade',
      descricao:
        'Cada lote passa por análises cromatográficas, microbiológicas e testes de estabilidade. Laudos são emitidos antes de qualquer liberação.',
    },
    {
      numero: '04',
      Icon: Truck,
      titulo: 'Acesso ao Paciente',
      descricao:
        'Com cadastro ativo na plataforma, o paciente tem acesso direto aos produtos disponíveis e ao acompanhamento de seu pedido em tempo real.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-widest">Processo</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Do laboratório{' '}
            <span className="text-primary-400">ao paciente</span>
          </h2>
          <p className="text-lg text-neutral-400">
            Cada etapa é documentada, rastreável e auditável — porque transparência
            não é diferencial, é obrigação.
          </p>
        </div>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-600/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {etapas.map((etapa) => {
              const Icon = etapa.Icon;
              return (
                <div key={etapa.numero} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-primary-500/20 rounded-full" />
                    <div className="relative w-24 h-24 bg-neutral-800 border-2 border-primary-500/50 rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10 text-primary-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center font-display shadow-lg">
                      {etapa.numero}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {etapa.titulo}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-sm max-w-xs mx-auto">
                    {etapa.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/cadastro">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white border-0">
              Quero ter acesso
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
