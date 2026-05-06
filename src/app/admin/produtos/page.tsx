import { Metadata } from 'next';
import Link from 'next/link';
import { Plus, Pencil, FlaskConical } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PRODUTOS_MOCK } from '@/lib/constants';

export const metadata: Metadata = { title: 'Produtos · Admin Neurofarma' };

export default function AdminProdutosPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Produtos</h1>
          <p className="text-neutral-500 mt-1">Gerencie o catálogo de formulações disponíveis.</p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo produto
          </Button>
        </Link>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Produto</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Categoria</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">Slug</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {PRODUTOS_MOCK.map((produto, i) => (
              <tr key={produto.id} className={i !== PRODUTOS_MOCK.length - 1 ? 'border-b border-neutral-100' : ''}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{produto.nome}</p>
                      <p className="text-xs text-neutral-500 line-clamp-1 max-w-xs">{produto.descricaoCurta}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-600 hidden md:table-cell">{produto.categoria}</td>
                <td className="px-6 py-4 font-mono text-xs text-neutral-400 hidden lg:table-cell">{produto.slug}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${produto.ativo ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${produto.ativo ? 'bg-green-500' : 'bg-neutral-400'}`} />
                    {produto.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/produtos/${produto.id}`}>
                    <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-primary-600">
                      <Pencil className="w-4 h-4 mr-1.5" />
                      Editar
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
