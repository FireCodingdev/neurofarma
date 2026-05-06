import { Metadata } from 'next';
import { CadastroForm } from '@/components/forms/CadastroForm';
import { ShieldCheck, FlaskConical, PackageSearch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Criar conta · Neurofarma',
  description: 'Cadastre-se e tenha acesso aos produtos e pedidos da Neurofarma.',
};

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/40 via-white to-accent-mint/20 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info column */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Cadastro gratuito
            </div>

            <h1 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-5">
              Faça parte da{' '}
              <span className="text-primary-600 italic">causa</span>
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Crie sua conta e tenha acesso à plataforma da Neurofarma —
              acompanhe nossos produtos, realize pedidos e faça parte de uma
              comunidade que acredita no poder da ciência.
            </p>

            <div className="space-y-5">
              {[
                { Icon: FlaskConical, text: 'Acesso ao catálogo completo de formulações' },
                { Icon: PackageSearch, text: 'Realize e acompanhe seus pedidos' },
                { Icon: ShieldCheck, text: 'Conta segura com dados protegidos' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary-700" />
                  </div>
                  <span className="text-neutral-700">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft p-6 lg:p-8">
            <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-6">
              Criar conta
            </h2>
            <CadastroForm />
          </div>
        </div>
      </div>
    </div>
  );
}
