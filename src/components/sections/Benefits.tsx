import { FlaskConical, Leaf, Microscope } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function Benefits() {
  const pilares = [
    {
      Icon: Microscope,
      titulo: 'Pesquisa de Ponta',
      descricao:
        'Nossa equipe de pesquisadores trabalha na extração, isolamento e caracterização de canabinoides como CBD, THC e terpenos a partir de biomassa vegetal controlada.',
      detalhes: [
        'Cromatografia e análise de pureza',
        'Estudos de estabilidade e biodisponibilidade',
        'Parcerias com universidades brasileiras',
      ],
    },
    {
      Icon: FlaskConical,
      titulo: 'Formulações Personalizadas',
      descricao:
        'Cada produto é desenvolvido com foco em indicações clínicas específicas — epilepsia refratária, dor crônica, ansiedade, transtornos neurológicos e mais.',
      detalhes: [
        'Padronização de concentrações ativas',
        'Formas farmacêuticas diversas (óleos, cápsulas)',
        'Rastreabilidade lote a lote',
      ],
    },
    {
      Icon: Leaf,
      titulo: 'Rigor e Transparência',
      descricao:
        'Todos os nossos processos seguem as Boas Práticas de Fabricação (BPF) e são auditáveis, desde a origem da matéria-prima até a entrega ao paciente.',
      detalhes: [
        'Laudos analíticos disponíveis',
        'Cadeia de custódia documentada',
        'Conformidade com RDC 327/2019',
      ],
    },
  ];

  return (
    <section id="pesquisa" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">O que fazemos</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 mb-4">
            Ciência séria por trás de{' '}
            <span className="text-primary-600">cada gota</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Não somos uma farmácia. Somos um laboratório de pesquisa que transforma
            conhecimento científico em tratamentos reais para pacientes reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pilares.map((pilar, idx) => {
            const Icon = pilar.Icon;
            return (
              <Card key={idx} hoverable className="group">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors">
                  <Icon className="w-7 h-7 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3">
                  {pilar.titulo}
                </h3>
                <p className="text-neutral-600 mb-5 leading-relaxed text-sm">
                  {pilar.descricao}
                </p>
                <ul className="space-y-2">
                  {pilar.detalhes.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      {d}
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
