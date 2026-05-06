'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loginSchema, type LoginFormData } from '@/lib/validations';

/**
 * Formulário de login do profissional.
 * Em produção, integre com Supabase Auth (signInWithPassword).
 */
export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      // Simulação. Em produção, troque por Supabase:
      // const { error } = await supabase.auth.signInWithPassword(data)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Login simulado:', data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
