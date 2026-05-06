import { Stethoscope, BookOpen, Star, LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface Beneficio {
  Icon: LucideIcon;
  titulo: string;
  descricao: string;
  detalhes: string[];
}

/**
 * Grid de 3 benefícios principais do programa.
 * Cards com ícone, título, descrição e bullet points.
 */
export function Benefits() {
  const beneficios: Beneficio[] = [
    {
      Icon: Stethoscope,
      titulo: 'Assistência Especializada',
      descricao:
        'Acesso direto a uma rede de suporte clínico para tirar dúvidas, discutir casos e receber orientação.',
      detalhes: [
        'Suporte técnico via plataforma',
        'Discussão de casos clínicos',
        'Material clínico atualizado',
      ],
    },
    {
      Icon: BookOpen,
      titulo: 'Conteúdos e Encontros Clínicos',
      descricao:
        'Participe de encontros mensais com especialistas e tenha acesso a uma biblioteca exclusiva de conteúdo.',
      detalhes: [
        'Encontros clínicos mensais',
        'Biblioteca de artigos e estudos',
        'Certificados digitais',
      ],
    },
    {
      Icon: Star,
      titulo: 'Visibilidade Profissional',
      descricao:
        'Apareça na nossa rede de prescritores e receba indicações de pacientes que buscam atendimento qualificado.',
      detalhes: [
        'Perfil público na plataforma',
        'Indicações de pacientes',
        'Selo de profissional verificado',
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Benefícios para o seu{' '}
            <span className="text-primary-600">dia a dia clínico</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Tudo que você precisa para crescer profissionalmente e oferecer o melhor cuidado aos seus pacientes.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {beneficios.map((beneficio, idx) => {
            const Icon = beneficio.Icon;
            return (
              <Card key={idx} hoverable className="group">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors">
                  <Icon className="w-7 h-7 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">
                  {beneficio.titulo}
                </h3>
                <p className="text-neutral-600 mb-5 leading-relaxed">
                  {beneficio.descricao}
                </p>
                <ul className="space-y-2">
                  {beneficio.detalhes.map((detalhe) => (
                    <li
                      key={detalhe}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      {detalhe}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
