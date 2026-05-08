
import Link from 'next/link';
import { ArrowRight, FlaskConical, ShieldCheck, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DEFAULT_HOME_CONTENT, type HeroContent } from '@/lib/home-content';

interface HeroProps {
  content?: HeroContent;
}

// Ícones dos trust indicators são fixos (não editáveis pelo admin) —
// mantemos a paridade visual com o design original. O texto é editável.
const TRUST_ICONS = [FlaskConical, Microscope, ShieldCheck];

export function Hero({ content = DEFAULT_HOME_CONTENT.hero }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center pt-8 pb-24 lg:pt-12 lg:pb-32">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column: content left, image space right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column — all content */}
          <div className="flex flex-col items-start">
            {/* Legal badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-8 animate-fade-in">
              <ShieldCheck className="w-4 h-4" />
              {content.badge}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              {content.titulo_parte1}
              <span className="text-primary-400 italic">{content.titulo_destaque}</span>
              {content.titulo_parte2}
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-neutral-300 mb-10 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {content.subtitulo}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/cadastro">
                <Button size="lg" className="group w-full sm:w-auto bg-primary-500 hover:bg-primary-400 text-white border-0">
                  {content.cta_primario}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#pesquisa">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  {content.cta_secundario}
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-14 grid grid-cols-3 gap-4 w-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {content.trust_indicators.slice(0, 3).map((item, idx) => {
                const Icon = TRUST_ICONS[idx] ?? FlaskConical;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Icon className="w-6 h-6 text-primary-400" />
                    <span className="text-lg font-display font-bold text-white leading-tight">{item.label}</span>
                    <span className="text-xs text-neutral-400">{item.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — empty on purpose: dropper image from global background fills this space */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
