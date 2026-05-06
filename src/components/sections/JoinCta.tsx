import Link from 'next/link';
import { ArrowRight, Heart, Users, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function JoinCta() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">Faça parte</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 mb-5">
          Seja parte dessa{' '}
          <span className="text-primary-600">transformação</span>
        </h2>
        <p className="text-lg text-neutral-600 mb-10 max-w-xl mx-auto leading-relaxed">
          A Neurofarma existe para democratizar o acesso a tratamentos inovadores.
          Se você acredita que a ciência pode mudar vidas, cadastre-se e acompanhe
          de perto o que estamos construindo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/cadastro">
            <Button size="lg" className="group w-full sm:w-auto">
              Criar meu cadastro
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/produtos">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver nossos produtos
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-neutral-200">
          {[
            { Icon: Users, label: 'Acesso à plataforma', sub: 'Acompanhe pedidos e histórico' },
            { Icon: Microscope, label: 'Conteúdo científico', sub: 'Estudos e atualizações exclusivas' },
            { Icon: Heart, label: 'Impacto real', sub: 'Cada cadastro apoia a pesquisa' },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary-700" />
              </div>
              <p className="font-semibold text-neutral-900 text-sm">{label}</p>
              <p className="text-xs text-neutral-500">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
