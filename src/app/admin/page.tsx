import { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Users, ShoppingCart, TrendingUp, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { supabaseAdmin } from '@/lib/supabase-server';

export const metadata: Metadata = { title: 'Admin Dashboard · Neurofarma' };
export const dynamic = 'force-dynamic';

async function getDashboardData() {
  try {
    const [produtosRes, clientesRes, pedidosRes] = await Promise.all([
      supabaseAdmin.from('produtos').select('id, ativo', { count: 'exact' }),
      supabaseAdmin.from('clientes').select('id', { count: 'exact' }),
      supabaseAdmin.from('pedidos').select('id, status, produto_nome, numero, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const totalProdutosAtivos = (produtosRes.data ?? []).filter((p) => p.ativo).length;
    const totalClientes = clientesRes.count ?? 0;
    const pedidos = pedidosRes.data ?? [];
    const pedidosAbertos = pedidos.filter((p) => p.status !== 'Entregue' && p.status !== 'Cancelado').length;
    const pedidosEntregues = pedidos.filter((p) => p.status === 'Entregue').length;

    return { totalProdutosAtivos, totalClientes, pedidosAbertos, pedidosEntregues, pedidosRecentes: pedidos };
  } catch {
    return { totalProdutosAtivos: 0, totalClientes: 0, pedidosAbertos: 0, pedidosEntregues: 0, pedidosRecentes: [] };
  }
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  'Entregue': <CheckCircle2 className="w-4 h-4 text-green-500" />,
  'Enviado': <TrendingUp className="w-4 h-4 text-blue-500" />,
  'Em preparo': <Clock className="w-4 h-4 text-yellow-500" />,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

export default async function AdminDashboard() {
  const { totalProdutosAtivos, totalClientes, pedidosAbertos, pedidosEntregues, pedidosRecentes } =
    await getDashboardData();

  const stats = [
    { label: 'Produtos ativos', value: totalProdutosAtivos.toString(), Icon: FlaskConical, href: '/admin/produtos' },
    { label: 'Usuários cadastrados', value: totalClientes > 0 ? totalClientes.toString() : '—', Icon: Users, href: '/admin/usuarios' },
    { label: 'Pedidos abertos', value: pedidosAbertos > 0 ? pedidosAbertos.toString() : '—', Icon: ShoppingCart, href: '/admin/pedidos' },
    { label: 'Pedidos entregues', value: pedidosEntregues > 0 ? pedidosEntregues.toString() : '—', Icon: TrendingUp, href: '/admin/pedidos' },
  ];

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
            {pedidosRecentes.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-neutral-400">
                Nenhum pedido ainda.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-50 bg-neutral-50/50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Pedido</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Produto</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase hidden sm:table-cell">Data</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosRecentes.map((p: any, i: number) => (
                    <tr key={p.id} className={i !== pedidosRecentes.length - 1 ? 'border-b border-neutral-100' : ''}>
                      <td className="px-6 py-3.5 font-mono text-xs text-neutral-500">{p.numero}</td>
                      <td className="px-6 py-3.5 font-medium text-neutral-900">{p.produto_nome}</td>
                      <td className="px-6 py-3.5 text-neutral-500 hidden sm:table-cell text-xs">{formatDate(p.created_at)}</td>
                      <td className="px-6 py-3.5">
                        <span className="flex items-center gap-1.5">
                          {STATUS_ICON[p.status] ?? <Clock className="w-4 h-4 text-neutral-400" />}
                          <span className="text-xs font-medium text-neutral-700">{p.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>

        {/* Quick links */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-neutral-900">Atalhos</h2>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Gerenciar produtos', href: '/admin/produtos' },
                { label: 'Editar conteúdo da home', href: '/admin/conteudo' },
                { label: 'Novo produto', href: '/admin/produtos/novo' },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors group">
                  <span className="text-sm text-neutral-700 font-medium group-hover:text-primary-600">{label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-primary-500" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
