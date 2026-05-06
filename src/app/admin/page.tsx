import { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Users, ShoppingCart, TrendingUp, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { PRODUTOS_MOCK } from '@/lib/constants';

export const metadata: Metadata = { title: 'Admin Dashboard · Neurofarma' };

export default function AdminDashboard() {
  const stats = [
    { label: 'Produtos ativos', value: PRODUTOS_MOCK.filter((p) => p.ativo).length.toString(), Icon: FlaskConical, href: '/admin/produtos' },
    { label: 'Usuários cadastrados', value: '—', Icon: Users, href: '/admin/usuarios' },
    { label: 'Pedidos abertos', value: '—', Icon: ShoppingCart, href: '/admin/pedidos' },
    { label: 'Pedidos entregues', value: '—', Icon: TrendingUp, href: '/admin/pedidos' },
  ];

  const pedidosRecentes = [
    { id: 'NF-001', cliente: 'João Silva', produto: 'Neuro-C10', status: 'Em preparo', data: '02/05/2026' },
    { id: 'NF-002', cliente: 'Maria Souza', produto: 'Neuro-Caps', status: 'Enviado', data: '01/05/2026' },
    { id: 'NF-003', cliente: 'Carlos Lima', produto: 'Neuro-Balance', status: 'Entregue', data: '28/04/2026' },
  ];

  const STATUS_ICON: Record<string, React.ReactNode> = {
    'Entregue': <CheckCircle2 className="w-4 h-4 text-green-500" />,
    'Enviado': <TrendingUp className="w-4 h-4 text-blue-500" />,
    'Em preparo': <Clock className="w-4 h-4 text-yellow-500" />,
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Visão geral da operação em tempo real.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, Icon, href }) => (
          <Link key={label} href={href}>
            <Card hoverable className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-700" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-300" />
              </div>
              <p className="text-2xl font-bold font-display text-neutral-900">{value}</p>
              <p className="text-sm text-neutral-500 mt-1">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="font-display font-semibold text-neutral-900">Pedidos recentes</h2>
              <Link href="/admin/pedidos" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-50 bg-neutral-50/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Pedido</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase hidden sm:table-cell">Cliente</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Produto</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidosRecentes.map((p, i) => (
                  <tr key={p.id} className={i !== pedidosRecentes.length - 1 ? 'border-b border-neutral-100' : ''}>
                    <td className="px-6 py-3.5 font-mono text-xs text-neutral-500">{p.id}</td>
                    <td className="px-6 py-3.5 text-neutral-700 hidden sm:table-cell">{p.cliente}</td>
                    <td className="px-6 py-3.5 font-medium text-neutral-900">{p.produto}</td>
                    <td className="px-6 py-3.5">
                      <span className="flex items-center gap-1.5">
                        {STATUS_ICON[p.status]}
                        <span className="text-xs font-medium text-neutral-700">{p.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Products quick access */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-neutral-900">Produtos</h2>
              <Link href="/admin/produtos" className="text-sm text-primary-600 hover:underline">
                Gerenciar
              </Link>
            </div>
            <div className="space-y-3">
              {PRODUTOS_MOCK.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{p.nome}</p>
                    <p className="text-xs text-neutral-500">{p.categoria}</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.ativo ? 'bg-green-400' : 'bg-neutral-300'}`} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
