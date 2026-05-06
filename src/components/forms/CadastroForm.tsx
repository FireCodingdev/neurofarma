'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { cadastroSchema, type CadastroFormData } from '@/lib/validations';
import { ESPECIALIDADES } from '@/lib/constants';

/**
 * Formulário de cadastro de profissional de saúde.
 *
 * Fluxo real:
 *  1. Valida os dados client-side com Zod
 *  2. POST /api/cadastro (server-side valida novamente + grava no Supabase)
 *  3. Exibe tela de sucesso → profissional receberá e-mail para definir senha
 */
export function CadastroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      crm: '',
      especialidade: '',
      email: '',
      telefone: '',
      termos: false,
    },
  });

  const onSubmit = async (data: CadastroFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        // Erro tratado (e-mail duplicado, dados inválidos etc.)
        setServerError(json.error ?? 'Erro ao enviar cadastro. Tente novamente.');
        return;
      }

      setIsSuccess(true);
      reset();
    } catch {
      setServerError('Falha de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Tela de sucesso ──────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-primary-200 p-8 text-center shadow-soft">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-2">
          Cadastro recebido!
        </h3>
        <p className="text-neutral-600 mb-2">
          Sua solicitação foi registrada com sucesso.
        </p>
        <p className="text-sm text-neutral-500 mb-6">
          Você receberá um <strong>e-mail</strong> para criar sua senha e acessar
          a plataforma assim que sua conta for aprovada (até 48h úteis).
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Fazer novo cadastro
        </Button>
      </div>
    );
  }

  // ── Formulário ───────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Erro do servidor */}
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <Input
        label="Nome completo"
        placeholder="Como aparece no seu registro profissional"
        {...register('nome')}
        error={errors.nome?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="CRM / Registro profissional"
          placeholder="CRM 123456/SP"
          {...register('crm')}
          error={errors.crm?.message}
        />
        <Select
          label="Especialidade"
          placeholder="Selecione..."
          options={ESPECIALIDADES}
          {...register('especialidade')}
          error={errors.especialidade?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Telefone / WhatsApp"
          type="tel"
          placeholder="(74) 98106-4385"
          {...register('telefone')}
          error={errors.telefone?.message}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('termos')}
            className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">
            Aceito os{' '}
            <a href="#" className="text-primary-600 hover:underline">
              termos de uso
            </a>{' '}
            e a{' '}
            <a href="#" className="text-primary-600 hover:underline">
              política de privacidade
            </a>
            .
          </span>
        </label>
        {errors.termos && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.termos.message}
          </p>
        )}
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
            Enviando...
          </>
        ) : (
          'Enviar cadastro'
        )}
      </Button>
    </form>
  );
}
