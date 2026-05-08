'use client';

import { useEffect, useState } from 'react';
import { Users, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
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
                {['Nome', 'E-mail', 'Telefone', 'Cidade / UF', 'Cadastro'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={u.id} className={i !== usuarios.length - 1 ? 'border-b border-neutral-100' : ''}>
                  <td className="px-5 py-4 font-medium text-neutral-900">{u.nome || '—'}</td>
                  <td className="px-5 py-4 text-neutral-600">{u.email}</td>
                  <td className="px-5 py-4 text-neutral-500">{u.telefone || '—'}</td>
                  <td className="px-5 py-4 text-neutral-500">
                    {u.cidade && u.estado ? `${u.cidade} / ${u.estado}` : '—'}
                  </td>
                  <td className="px-5 py-4 text-neutral-400 text-xs">{formatDate(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
