'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar com Supabase — atualizar na tabela `profissionais`
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-neutral-900">Configurações</h1>
        <p className="text-neutral-500 mt-1">Gerencie suas informações de conta.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <h2 className="font-semibold text-neutral-900 mb-5">Dados pessoais</h2>
          <div className="space-y-4">
            <Input label="Nome completo" type="text" placeholder="Seu nome" defaultValue="" />
            <Input label="E-mail" type="email" placeholder="seu@email.com" defaultValue="" disabled />
            <Input label="Telefone" type="tel" placeholder="(00) 00000-0000" defaultValue="" />
            <Input label="CPF" type="text" placeholder="000.000.000-00" defaultValue="" />
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-neutral-900 mb-5">Endereço de entrega</h2>
          <div className="space-y-4">
            <Input label="CEP" type="text" placeholder="00000-000" defaultValue="" />
            <Input label="Logradouro" type="text" placeholder="Rua, Avenida..." defaultValue="" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Número" type="text" placeholder="Nº" defaultValue="" />
              <Input label="Complemento" type="text" placeholder="Apto, Sala..." defaultValue="" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Cidade" type="text" placeholder="Cidade" defaultValue="" />
              <Input label="Estado" type="text" placeholder="UF" defaultValue="" />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-neutral-900 mb-5">Segurança</h2>
          <div className="space-y-4">
            <Input label="Nova senha" type="password" placeholder="••••••••" defaultValue="" />
            <Input label="Confirmar senha" type="password" placeholder="••••••••" defaultValue="" />
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" size="lg">Salvar alterações</Button>
          {saved && (
            <span className="text-sm text-primary-600 font-medium animate-fade-in">
              ✓ Salvo com sucesso
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
