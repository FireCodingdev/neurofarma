'use client';

import { useEffect, useState } from 'react';
import { Users, RefreshCw, ChevronDown, ChevronUp, Mail, Phone, MapPin, FileText, Star, Calendar, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Cliente } from '@/types';

type UsuarioCompleto = Cliente & { created_at: string; updated_at?: string };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

function Campo({ label, value }: { label: string; value?: string | boolean | null }) {
  if (value === undefined || value === null || value === '') return null;
  const display = typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value;
  return (
    <div>
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-neutral-800">{display}</p>
    </div>
  );
}

function UsuarioRow({ u, index, total }: { u: UsuarioCompleto; index: number; total: number }) {
  const [aberto, setAberto] = useState(false);

  const endereco = [u.logradouro, u.numero, u.complemento, u.cidade, u.estado, u.cep]
    .filter(Boolean).join(', ');

  return (
    <>
      <tr className={index !== total - 1 || aberto ? 'border-b border-neutral-100' : ''}>
        <td className="px-5 py-4 font-medium text-neutral-900">{u.nome || '—'}</td>
        <td className="px-5 py-4 text-neutral-600">{u.email}</td>
        <td className="px-5 py-4 text-neutral-500">{u.telefone || '—'}</td>
        <td className="px-5 py-4 text-neutral-500">
          {u.cidade && u.estado ? `${u.cidade} / ${u.estado}` : '—'}
        </td>
        <td className="px-5 py-4 text-neutral-400 text-xs">{formatDate(u.created_at)}</td>
        <td className="px-5 py-4">
          <button
            onClick={() => setAberto((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            {aberto ? (
              <>Fechar <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Ver tudo <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        </td>
      </tr>

      {aberto && (
        <tr className={index !== total - 1 ? 'border-b border-neutral-100' : ''}>
          <td colSpan={6} className="px-5 pb-5 pt-3 bg-neutral-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">

              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <Campo label="Nome completo" value={u.nome} />
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <Campo label="E-mail" value={u.email} />
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <Campo label="Telefone" value={u.telefone} />
              </div>

              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <Campo label="CPF" value={u.cpf} />
              </div>

              {endereco && (
                <div className="flex items-start gap-2 col-span-2">
                  <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Endereço</p>
                    <p className="text-sm text-neutral-800">{endereco}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <Campo label="Apoiador" value={u.apoiador} />
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Cadastro</p>
                  <p className="text-sm text-neutral-800">{formatDate(u.created_at)}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">User ID</p>
                  <p className="text-xs text-neutral-500 font-mono break-all">{u.user_id}</p>
                </div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<UsuarioCompleto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = () => {
    setLoading(true);
    fetch('/api/admin/usuarios')
      .then((r) => r.json())
      .then((json) => setUsuarios(json.usuarios ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsuarios(); }, []);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Usuários</h1>
          <p className="text-neutral-500 mt-1">Clientes cadastrados na plataforma.</p>
        </div>
        <Button size="sm" variant="outline" onClick={fetchUsuarios}>
          <RefreshCw className="w-4 h-4 mr-2" /> Atualizar
        </Button>
      </div>

      {loading ? (
        <Card className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </Card>
      ) : usuarios.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <Users className="w-14 h-14 text-neutral-300 mb-4" />
          <p className="font-semibold text-neutral-700 text-lg">Nenhum usuário cadastrado ainda</p>
          <p className="text-sm text-neutral-500 mt-1">Os clientes aparecerão aqui após se cadastrarem.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['Nome', 'E-mail', 'Telefone', 'Cidade / UF', 'Cadastro', ''].map((h, i) => (
                  <th key={i} className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <UsuarioRow key={u.id} u={u} index={i} total={usuarios.length} />
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
