import Link from 'next/link';
import { Pill, Pipette, Cookie, FlaskConical, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DEFAULT_HOME_CONTENT, type StepsContent } from '@/lib/home-content';

interface StepsProps {
  content?: StepsContent;
}

// Ícones e numeração fixos por posição.
const ETAPA_ICONS = [Pill, Pipette, Cookie, FlaskConical];

export function Steps({ content = DEFAULT_HOME_CONTENT.steps }: StepsProps) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-widest">{content.eyebrow}</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            {content.titulo_parte1}
            <span className="text-primary-400">{content.titulo_destaque}</span>
          </h2>
          <p className="text-lg text-neutral-400">
            {content.subtitulo}
          </p>
        </div>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-600/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {content.etapas.slice(0, 4).map((etapa, idx) => {
              const Icon = ETAPA_ICONS[idx] ?? Leaf;
              const numero = String(idx + 1).padStart(2, '0');
              return (
                <div key={idx} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-primary-500/20 rounded-full" />
                    <div className="relative w-24 h-24 bg-neutral-800 border-2 border-primary-500/50 rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10 text-primary-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center font-display shadow-lg">
                      {numero}
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
              {content.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
