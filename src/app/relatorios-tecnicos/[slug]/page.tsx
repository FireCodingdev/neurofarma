import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase-server';
import { ArrowLeft, Calendar, Tag, Download } from 'lucide-react';
import { PaywallRelatorio } from '@/components/sections/PaywallRelatorio';
import { RelatorioViewCounter } from '@/components/sections/RelatorioViewCounter';
import type { RelatorioTecnico } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ── helpers ──────────────────────────────────────────────────────────────────

async function getRelatorio(slug: string): Promise<RelatorioTecnico | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('relatorios_tecnicos')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'publicado')
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

async function getAuthStatus(): Promise<{ logado: boolean; apoiador: boolean }> {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
    );
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { logado: false, apoiador: false };
    const { data } = await supabaseAdmin
      .from('clientes')
      .select('apoiador')
      .eq('user_id', session.user.id)
      .single();
    return { logado: true, apoiador: data?.apoiador === true };
  } catch {
    return { logado: false, apoiador: false };
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

// ── metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const rel = await getRelatorio(params.slug);
  if (!rel) return { title: 'Relatório não encontrado · Neurofarma' };
  return {
    title: `${rel.titulo} · Neurofarma`,
    description: rel.subtitulo ?? 'Relatório técnico de pesquisa e desenvolvimento da Neurofarma.',
  };
}

// ── page ─────────────────────────────────────────────────────────────────────

export default async function RelatorioDetalhe({ params }: { params: { slug: string } }) {
  const [rel, { logado, apoiador }] = await Promise.all([
    getRelatorio(params.slug),
    getAuthStatus(),
  ]);

  if (!rel) notFound();

  const bloqueado = rel.exclusivo_apoiador && !apoiador;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Capa */}
      {rel.imagem_capa && (
        <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-neutral-900 overflow-hidden">
          <img
            src={rel.imagem_capa}
            alt={rel.titulo}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Voltar */}
        <Link
          href="/relatorios-tecnicos"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Todos os relatórios
        </Link>

        {/* Cabeçalho */}
        <div className="mb-8">
          {rel.categorias?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {rel.categorias.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100"
                >
                  <Tag className="w-3 h-3" />
                  {cat}
                </span>
              ))}

              {rel.exclusivo_apoiador && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  Exclusivo para Apoiadores
                </span>
              )}
            </div>
          )}

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight mb-4">
            {rel.titulo}
          </h1>

          {rel.subtitulo && (
            <p className="text-lg text-neutral-600 leading-relaxed mb-4">{rel.subtitulo}</p>
          )}

          <div className="flex items-center flex-wrap gap-4">
            {rel.data_publicacao && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Calendar className="w-4 h-4" />
                Publicado em {formatDate(rel.data_publicacao)}
              </div>
            )}

            {typeof rel.visualizacoes === 'number' && rel.visualizacoes > 0 && (
              <span className="text-sm text-neutral-400">
                {rel.visualizacoes} {rel.visualizacoes === 1 ? 'leitura' : 'leituras'}
              </span>
            )}
          </div>
        </div>

        {/* Botão de download (só quando autorizado e PDF existe) */}
        {!bloqueado && rel.pdf_url && (
          <a
            href={`/api/relatorios/${rel.slug}/download`}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Baixar PDF
          </a>
        )}

        {/* Corpo ou Paywall */}
        {bloqueado ? (
          <PaywallRelatorio logado={logado} />
        ) : (
          <>
            {rel.corpo && (
              <article
                className="relatorio-corpo text-neutral-700 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: rel.corpo }}
              />
            )}
            {/* Incrementa visualizações client-side (evita double-count em SSR) */}
            <RelatorioViewCounter slug={rel.slug} />
          </>
        )}

        {/* Rodapé */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Link
            href="/relatorios-tecnicos"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos os relatórios
          </Link>
        </div>
      </div>
    </div>
  );
}
