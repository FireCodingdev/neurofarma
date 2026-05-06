import { Metadata } from 'next';
import { CadastroForm } from '@/components/forms/CadastroForm';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cadastro de Profissional',
  description: 'Cadastre-se no programa de profissionais de saúde.',
};

/**
 * Página /cadastro
 * Layout em duas colunas: informações + formulário.
 */
export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/40 via-white to-accent-mint/20 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Coluna info */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Cadastro 100% gratuito
            </div>

            <h1 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-5">
              Faça parte da nossa rede de{' '}
              <span className="text-primary-600 italic">profissionais</span>
            </h1>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Preencha o formulário ao lado com seus dados profissionais. Nossa equipe valida sua
              inscrição em até 48 horas úteis e você já pode começar a aproveitar todos os benefícios.
            </p>

            <div className="space-y-4">
              {[
                'Cadastro rápido e seguro',
                'Validação do registro junto ao conselho',
                'Suporte para tirar suas dúvidas',
                'Acesso imediato após aprovação',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna form */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft p-6 lg:p-8">
            <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-6">
              Seus dados profissionais
            </h2>
            <CadastroForm />
          </div>
        </div>
      </div>
    </div>
  );
}
