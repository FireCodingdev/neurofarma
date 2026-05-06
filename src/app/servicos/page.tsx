import { Metadata } from 'next';
import { HeartPulse, Headphones, GraduationCap, Users2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Conheça os serviços oferecidos no programa.',
};

/**
 * Página /servicos (placeholder estruturado).
 */
export default function ServicosPage() {
  const servicos = [
    {
      Icon: HeartPulse,
      titulo: 'Atendimento personalizado',
      descricao:
        'Acompanhamento individualizado de cada paciente, com plano terapêutico adaptado.',
    },
    {
      Icon: Headphones,
      titulo: 'Suporte 7 dias por semana',
      descricao:
        'Equipe disponível para tirar dúvidas e prestar suporte clínico via WhatsApp e e-mail.',
    },
    {
      Icon: GraduationCap,
      titulo: 'Formação continuada',
      descricao:
        'Cursos, workshops e encontros clínicos mensais com especialistas reconhecidos.',
    },
    {
      Icon: Users2,
      titulo: 'Comunidade ativa',
      descricao:
        'Fórum exclusivo para discussão de casos, networking e troca de experiências.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/40 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Nossos <span className="text-primary-600 italic">Serviços</span>
          </h1>
          <p className="text-lg text-neutral-600">
            Soluções integradas que apoiam o profissional em todas as etapas do cuidado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {servicos.map((servico) => {
            const Icon = servico.Icon;
            return (
              <Card key={servico.titulo} hoverable className="flex gap-5">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2">
                    {servico.titulo}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {servico.descricao}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
