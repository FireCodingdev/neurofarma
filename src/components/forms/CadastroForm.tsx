'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { cadastroSchema, type CadastroFormData } from '@/lib/validations';
import { ESPECIALIDADES } from '@/lib/constants';

/**
 * Formulário de cadastro de profissional de saúde.
 * - Validação client-side com Zod via react-hook-form
 * - Estado de loading e mensagem de sucesso
 * - Em produção, deve POSTar para /api/cadastro que escreve no Supabase
 */
export function CadastroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  /**
   * Handler de submissão do form.
   * Aqui você fará o POST para sua API (ex.: Supabase).
   */
  const onSubmit = async (data: CadastroFormData) => {
    setIsSubmitting(true);

    try {
      // Simulação de chamada de API. Em produção, substitua por:
      // await fetch('/api/cadastro', { method: 'POST', body: JSON.stringify(data) })
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Dados enviados:', data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Ocorreu um erro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-primary-200 p-8 text-center shadow-soft">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-2">
          Cadastro recebido!
        </h3>
        <p className="text-neutral-600 mb-6">
          Sua solicitação foi registrada. Em até 48h úteis nossa equipe entrará em contato pelo
          e-mail informado para finalizar a validação do seu registro.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Fazer novo cadastro
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
          label="Telefone"
          type="tel"
          placeholder="(11) 99999-9999"
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
