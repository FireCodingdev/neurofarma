import Link from 'next/link';
import { ArrowRight, FlaskConical, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DEFAULT_HOME_CONTENT, type JoinCtaContent } from '@/lib/home-content';

interface JoinCtaProps {
  content?: JoinCtaContent;
}

const FEATURE_ICONS = [FlaskConical, BookOpen, MessageCircle];

export function JoinCta({ content = DEFAULT_HOME_CONTENT.joinCta }: JoinCtaProps) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">{content.eyebrow}</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 mb-5">
          {content.titulo_parte1}
          <span className="text-primary-600">{content.titulo_destaque}</span>
        </h2>
        <p className="text-lg text-neutral-600 mb-10 max-w-xl mx-auto leading-relaxed">
          {content.subtitulo}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/cadastro">
            <Button size="lg" className="group w-full sm:w-auto">
              {content.cta_primario}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a
            href={`https://wa.me/5574981064385?text=Olá! Quero saber mais sobre os produtos da Neurofarma.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <MessageCircle className="w-5 h-5" />
              {content.cta_secundario}
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-neutral-200">
          {content.features.slice(0, 3).map((f, idx) => {
            const Icon = FEATURE_ICONS[idx] ?? FlaskConical;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>
                <p className="font-semibold text-neutral-900 text-sm">{f.label}</p>
                <p className="text-xs text-neutral-500">{f.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}