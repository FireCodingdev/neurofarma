import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Hero principal da landing page.
 * Layout: título de impacto + subtítulo + CTAs + indicadores sociais.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-mint/30 pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent-sage rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Programa para Profissionais de Saúde
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-6 leading-tight animate-slide-up">
            Cuidado, conhecimento e{' '}
            <span className="text-primary-600 italic">comunidade</span>{' '}
            em um só lugar.
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Faça parte do programa que conecta profissionais de saúde a pacientes,
            conteúdos clínicos exclusivos e uma rede de apoio especializada.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/cadastro">
              <Button size="lg" className="group w-full sm:w-auto">
                Quero fazer parte
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/planos">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Conhecer os planos
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 lg:gap-12 text-neutral-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary-700">+1.200</div>
              <div className="text-sm">Profissionais cadastrados</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-neutral-300" />
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary-700">+50</div>
              <div className="text-sm">Encontros clínicos/ano</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-neutral-300" />
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary-700">100%</div>
              <div className="text-sm">Verificação de registros</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
