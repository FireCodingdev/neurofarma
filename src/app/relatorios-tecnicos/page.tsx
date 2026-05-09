import { Metadata } from 'next';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase-server';
import { FileText, Calendar, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Relatórios Técnicos de P&D · Neurofarma',
  description: 'Relatórios técnicos de pesquisa e desenvolvimento farmacotécnico da Neurofarma em cannabis medicinal.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getRelatorios() {
  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('id, slug, titulo, subtitulo, imagem_capa, categorias, data_publicacao')
      .eq('status', 'publicado')
      .order('data_publicacao', { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function RelatoriosTecnicosPage() {
  const relatorios = await getRelatorios();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-widest">
            Pesquisa & Desenvolvimento
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Relatórios Técnicos
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Publicações científicas e técnicas da Neurofarma sobre formulações à base de cannabis medicinal.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {relatorios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="font-semibold text-neutral-700 text-lg">Nenhum relatório publicado ainda</p>
            <p className="text-sm text-neutral-500 mt-1">
              Em breve novos relatórios técnicos serão disponibilizados.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatorios.map((rel) => (
              <Link
                key={rel.id}
                href={`/relatorios-tecnicos/${rel.slug}`}
                className="group bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md hover:border-primary-200 transition-all duration-200"
              >
                <div className="relative aspect-video bg-neutral-100 overflow-hidden">
                  {rel.imagem_capa ? (
                    <img
                      src={rel.imagem_capa}
                      alt={rel.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-10 h-10 text-neutral-300" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {rel.categorias?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {rel.categorias.slice(0, 2).map((cat: string) => (
                        <span
                          key={cat}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="font-display font-bold text-neutral-900 text-base leading-snug mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {rel.titulo}
                  </h2>

                  {rel.subtitulo && (
                    <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{rel.subtitulo}</p>
                  )}

                  {rel.data_publicacao && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(rel.data_publicacao)}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
