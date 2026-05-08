'use client';

import { useEffect, useState } from 'react';
import { Settings, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Cliente } from '@/types';

export default function ConfiguracoesPage() {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', cpf: '',
    cep: '', logradouro: '', numero: '', complemento: '', cidade: '', estado: '',
  });
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('/api/conta/configuracoes')
      .then((r) => r.json())
      .then((json) => {
        const c: Partial<Cliente> = json.cliente ?? {};
        setForm({
          nome: c.nome ?? '',
          email: c.email ?? '',
          telefone: c.telefone ?? '',
          cpf: c.cpf ?? '',
          cep: c.cep ?? '',
          logradouro: c.logradouro ?? '',
          numero: c.numero ?? '',
          complemento: c.complemento ?? '',
          cidade: c.cidade ?? '',
          estado: c.estado ?? '',
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setErro('');
    try {
      const res = await fetch('/api/conta/configuracoes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setErro(json.error ?? 'Erro ao salvar.');
        setSaveStatus('error');
        return;
      }
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setErro('Falha de rede.');
      setSaveStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-10 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

        {saveStatus === 'error' && (
          <div className="flex items-start gap-3 p-4 mb-5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <span>{erro}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <Card>
            <h2 className="font-semibold text-neutral-900 mb-5">Dados pessoais</h2>
            <div className="space-y-4">
              <Input label="Nome completo" type="text" value={form.nome}
                onChange={(e) => set('nome', e.target.value)} placeholder="Seu nome" />
              <Input label="E-mail" type="email" value={form.email} disabled
                className="opacity-60 cursor-not-allowed" />
              <Input label="Telefone / WhatsApp" type="tel" value={form.telefone}
                onChange={(e) => set('telefone', e.target.value)} placeholder="(11) 99999-9999" />
              <Input label="CPF" type="text" value={form.cpf}
                onChange={(e) => set('cpf', e.target.value)} placeholder="000.000.000-00" />
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-neutral-900 mb-5">Endereço de entrega</h2>
            <div className="space-y-4">
              <Input label="CEP" type="text" value={form.cep}
                onChange={(e) => set('cep', e.target.value)} placeholder="00000-000" />
              <Input label="Logradouro" type="text" value={form.logradouro}
                onChange={(e) => set('logradouro', e.target.value)} placeholder="Rua, Avenida..." />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Número" type="text" value={form.numero}
                  onChange={(e) => set('numero', e.target.value)} placeholder="Nº" />
                <Input label="Complemento" type="text" value={form.complemento}
                  onChange={(e) => set('complemento', e.target.value)} placeholder="Apto, Bloco..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Cidade" type="text" value={form.cidade}
                  onChange={(e) => set('cidade', e.target.value)} placeholder="Cidade" />
                <Input label="Estado" type="text" value={form.estado}
                  onChange={(e) => set('estado', e.target.value)} placeholder="UF" maxLength={2} />
              </div>
            </div>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Salvando...' : 'Salvar alterações'}
            </Button>
            {saveStatus === 'success' && (
              <span className="flex items-center gap-1.5 text-sm text-primary-600 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Salvo com sucesso
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
