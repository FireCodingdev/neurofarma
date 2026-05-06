'use client';

import Link from 'next/link';
import { ArrowRight, FlaskConical, ShieldCheck, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-900 pt-16 pb-24 lg:pt-28 lg:pb-36">
      {/* Molecular background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-mint rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Legal badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-8 animate-fade-in">
            <ShieldCheck className="w-4 h-4" />
            100% Legal · Regulamentado pela Anvisa · RDC 327/2019
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            A ciência da{' '}
            <span className="text-primary-400 italic">cannabis</span>{' '}
            a serviço da vida.
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Desenvolvemos formulações farmacêuticas à base de Cannabis medicinal
            em laboratório certificado, com rigor científico e dentro de todos
            os parâmetros legais vigentes no Brasil.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/cadastro">
              <Button size="lg" className="group w-full sm:w-auto bg-primary-500 hover:bg-primary-400 text-white border-0">
                Faça parte da causa
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#pesquisa">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Conheça nossa pesquisa
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { Icon: FlaskConical, label: '+12 formulações', sub: 'desenvolvidas em laboratório' },
              { Icon: Microscope, label: '5+ anos', sub: 'de pesquisa científica' },
              { Icon: ShieldCheck, label: 'Anvisa', sub: 'autorização e conformidade' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Icon className="w-6 h-6 text-primary-400" />
                <span className="text-2xl font-display font-bold text-white">{label}</span>
                <span className="text-sm text-neutral-400 text-center">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
