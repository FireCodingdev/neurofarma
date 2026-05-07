'use client';

import { useState } from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar com Supabase — atualizar tabela `clientes`
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary-700" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-neutral-900">Configurações do perfil</h1>
            <p className="text-sm text-neutral-500">Gerencie suas informações pessoais</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <Card>
            <h2 className="font-semibold text-neutral-900 mb-5">Dados pessoais</h2>
            <div className="space-y-4">
              <Input label="Nome completo" type="text" placeholder="Seu nome" />
              <Input label="E-mail" type="email" placeholder="seu@email.com" disabled
                className="opacity-60 cursor-not-allowed" />
              <Input label="Telefone / WhatsApp" type="tel" placeholder="(11) 99999-9999" />
              <Input label="CPF" type="text" placeholder="000.000.000-00" />
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-neutral-900 mb-5">Endereço de entrega</h2>
            <div className="space-y-4">
              <Input label="CEP" type="text" placeholder="00000-000" />
              <Input label="Logradouro" type="text" placeholder="Rua, Avenida..." />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Número" type="text" placeholder="Nº" />
                <Input label="Complemento" type="text" placeholder="Apto, Bloco..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Cidade" type="text" placeholder="Cidade" />
                <Input label="Estado" type="text" placeholder="UF" />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-neutral-900 mb-5">Alterar senha</h2>
            <div className="space-y-4">
              <Input label="Nova senha" type="password" placeholder="Mínimo 8 caracteres" />
              <Input label="Confirmar nova senha" type="password" placeholder="Repita a senha" />
            </div>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg">Salvar alterações</Button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-primary-600 font-medium animate-fade-in">
                <CheckCircle2 className="w-4 h-4" /> Salvo com sucesso
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
