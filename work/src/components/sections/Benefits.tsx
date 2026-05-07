import { FlaskConical, Leaf, Microscope } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { DEFAULT_HOME_CONTENT, type BenefitsContent } from '@/lib/home-content';

interface BenefitsProps {
  content?: BenefitsContent;
}

// Ícones fixos por posição — só os textos são editáveis.
const PILAR_ICONS = [Microscope, FlaskConical, Leaf];

export function Benefits({ content = DEFAULT_HOME_CONTENT.benefits }: BenefitsProps) {
  return (
    <section id="pesquisa" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">{content.eyebrow}</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 mb-4">
            {content.titulo_parte1}
            <span className="text-primary-600">{content.titulo_destaque}</span>
          </h2>
          <p className="text-lg text-neutral-600">
            {content.subtitulo}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {content.pilares.slice(0, 3).map((pilar, idx) => {
            const Icon = PILAR_ICONS[idx] ?? FlaskConical;
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
                  {pilar.detalhes.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
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
