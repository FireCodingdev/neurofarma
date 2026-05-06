import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LoginForm } from '@/components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua área do profissional.',
};

/**
 * Página /login
 * Layout centralizado e minimalista, focado na ação.
 */
export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50/40 to-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center mb-6">
              <Image
                src="/imagens/logo.png"
                alt="NEUROFARMA"
                width={220}
                height={74}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>
            <h1 className="font-display text-3xl font-bold text-neutral-900 mb-2">
              Bem-vindo(a) de volta
            </h1>
            <p className="text-neutral-600">
              Entre na sua área do profissional
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-neutral-600 mt-8">
            Ainda não tem cadastro?{' '}
            <Link
              href="/cadastro"
              className="text-primary-600 font-medium hover:underline"
            >
              Cadastre-se agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
