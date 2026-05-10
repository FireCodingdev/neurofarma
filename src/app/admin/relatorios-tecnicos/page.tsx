import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { AdminLink } from '@/components/layout/AdminLink';
import { Plus, Pencil, FileText, Lock, Download } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabaseAdmin } from '@/lib/supabase-server';
import { AdminRelatoriosSort } from '@/components/admin/AdminRelatoriosSort';
import type { RelatorioTecnico } from '@/types';

export const metadata: Metadata = { title: 'Relatórios Técnicos · Admin Neurofarma' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getRelatorios(ordem: string): Promise<RelatorioTecnico[]> {
  try {
    let q = supabaseAdmin
      .from('relatorios_tecnicos')
      .select('id, slug, titulo, subtitulo, status, data_publicacao, criado_em, categorias, imagem_capa, corpo, atualizado_em, exclusivo_apoiador, pdf_url, visualizacoes');

    if (ordem === 'antigos') {
      q = q.order('data_publicacao', { ascending: true });
    } else if (ordem === 'mais-lidos') {
      q = q.order('visualizacoes', { ascending: false });
    } else {
      q = q.order('criado_em', { ascending: false });
    }

    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

interface PageProps {
  searchParams: { ordem?: string };
}

export default async function AdminRelatoriosPage({ searchParams }: PageProps) {
  const ordem      = searchParams.ordem ?? 'recentes';
  const relatorios = await getRelatorios(ordem);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Relatórios Técnicos</h1>
          <p className="text-neutral-500 mt-1">Gerencie os relatórios de pesquisa e desenvolvimento.</p>
        </div>
        <div className="flex items-center gap-3">
          <Suspense>
            <AdminRelatoriosSort ordemAtual={ordem} />
          </Suspense>
          <Link href="/admin/relatorios-tecnicos/novo">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo relatório
            </Button>
          </Link>
        </div>
      </div>

      {relatorios.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="w-14 h-14 text-neutral-300 mb-4" />
          <p className="font-semibold text-neutral-700 text-lg">Nenhum relatório cadastrado</p>
          <p className="text-sm text-neutral-500 mt-1 mb-6">
            Crie o primeiro relatório técnico de P&D para exibir no site.
          </p>
          <Link href="/admin/relatorios-tecnicos/novo">
            <Button size="sm">Criar primeiro relatório</Button>
          </Link>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Título</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Categorias</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">Data</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden xl:table-cell">Leituras</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {relatorios.map((rel, i) => (
                <tr key={rel.id} className={i !== relatorios.length - 1 ? 'border-b border-neutral-100' : ''}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-neutral-900 leading-snug">{rel.titulo}</p>
                          {rel.exclusivo_apoiador && (
                            <span title="Exclusivo para apoiadores"><Lock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" aria-label="Exclusivo para apoiadores" /></span>
                          )}
                          {rel.pdf_url && (
                            <span title="PDF anexado"><Download className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" aria-label="PDF anexado" /></span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 line-clamp-1 max-w-xs">{rel.subtitulo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {rel.categorias?.slice(0, 2).map((cat) => (
                        <span key={cat} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 hidden lg:table-cell">
                    {formatDate(rel.data_publicacao)}
                  </td>
                  <td className="px-6 py-4 text-neutral-500 hidden xl:table-cell">
                    {rel.visualizacoes ?? 0}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${rel.status === 'publicado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${rel.status === 'publicado' ? 'bg-green-500' : 'bg-amber-400'}`} />
                      {rel.status === 'publicado' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <AdminLink href={`/admin/relatorios-tecnicos/${rel.id}`}>
                      <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-primary-600">
                        <Pencil className="w-4 h-4 mr-1.5" />
                        Editar
                      </Button>
                    </AdminLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}