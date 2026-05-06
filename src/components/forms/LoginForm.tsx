'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { supabase } from '@/lib/supabase';

/**
 * Formulário de login com Supabase Auth.
 *
 * Fluxo:
 *  1. Valida e-mail + senha com Zod
 *  2. Chama supabase.auth.signInWithPassword
 *  3. Redireciona para /dashboard em caso de sucesso
 *  4. Exibe erro inline em caso de credenciais inválidas
 */
export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.senha,
    });

    if (error) {
      // Mensagens amigáveis em português
      if (
        error.message.includes('Invalid login') ||
        error.message.includes('invalid_credentials')
      ) {
        setAuthError('E-mail ou senha incorretos. Verifique e tente novamente.');
      } else if (error.message.includes('Email not confirmed')) {
        setAuthError('Confirme seu e-mail antes de acessar a plataforma.');
      } else {
        setAuthError('Erro ao entrar. Tente novamente em instantes.');
      }
      setIsSubmitting(false);
      return;
    }

    // Sessão criada — redireciona. O middleware protegerá /dashboard.
    router.push('/dashboard');
    router.refresh(); // atualiza Server Components com a nova sessão
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Erro de autenticação */}
      {authError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{authError}</span>
        </div>
      )}

      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        {...register('senha')}
        error={errors.senha?.message}
      />

      <div className="flex justify-end">
        <a
          href="#"
          className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
        >
          Esqueceu a senha?
        </a>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  );
}
