'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
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
 *  3. Lê app_metadata.role do usuário e redireciona:
 *       - admin   → /admin   (CRM)
 *       - default → /conta/pedidos (área do profissional)
 *     Se houver `?next=` na URL (ex.: middleware redirecionou pra cá),
 *     respeita o destino original.
 *  4. Exibe erro inline em caso de credenciais inválidas
 */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

    const { data: authData, error } = await supabase.auth.signInWithPassword({
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

    // Decide o destino:
    // 1. Se veio de uma rota protegida (?next=), respeita o destino original.
    // 2. Senão, bifurca pela role: admin → /admin, demais → /conta/pedidos.
    const nextParam = searchParams.get('next');
    const role = authData.user?.app_metadata?.role;

    let destino: string;
    if (nextParam && nextParam.startsWith('/')) {
      destino = nextParam;
    } else if (role === 'admin') {
      destino = '/admin';
    } else {
      destino = '/conta/pedidos';
    }

    router.push(destino);
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
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        autoComplete="current-password"
        {...register('senha')}
        error={errors.senha?.message}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
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