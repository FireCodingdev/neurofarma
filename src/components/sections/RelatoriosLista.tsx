'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FileText, Calendar, Tag, Lock, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const PAGE_SIZE = 9;

interface RelatorioCard {
  id: string;
  slug: string;
  titulo: string;
  subtitulo?: string;
  imagem_capa?: string;
  categorias: string[];
  data_publicacao?: string;
  visualizacoes?: number;
  exclusivo_apoiador: boolean;
  pdf_url?: string;
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function RelatoriosLista() {
  const searchParams   = useSearchParams();
  const q              = searchParams.get('q')         ?? '';
  const categoria      = searchParams.get('categoria') ?? '';
  const ordem          = searchParams.get('ordem')     ?? 'recentes';

  const [items,       setItems]       = useState<RelatorioCard[]>([]);
  const [total,       setTotal]       = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading,     setLoading]     = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchPage = useCallback(async (page: number, append: boolean) => {
    if (!append) {
      if (abortRef.current) abortRef.current.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
    }

    const setter = append ? setLoadingMore : setLoading;
    setter(true);

    try {
      const params = new URLSearchParams({
        page:  page.toString(),
        limit: PAGE_SIZE.toString(),
        ordem,
        ...(q         && { q }),
        ...(categoria && { categoria }),
      });

      const signal = append ? undefined : abortRef.current?.signal;
      const res  = await fetch(`/api/relatorios?${params}`, { signal });
      const json = await res.json();

      if (append) {
        setItems((prev) => [...prev, ...(json.relatorios ?? [])]);
      } else {
        setItems(json.relatorios ?? []);
        setTotal(json.total ?? 0);
      }
      if (!append) setTotal(json.total ?? 0);
    } catch (e: any) {
      if (e?.name !== 'AbortError') console.error('[RelatoriosLista]', e);
    } finally {
      setter(false);
    }
  }, [q, categoria, ordem]);

  // Reset ao mudar filtros / ordenação
  useEffect(() => {
    setCurrentPage(1);
    fetchPage(1, false);
  }, [fetchPage]);

  const handleLoadMore = () => {
    const next = currentPage + 1;
    setCurrentPage(next);
    fetchPage(next, true);
  };

  const hasMore = items.length < total;

  // ── Estado vazio ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-neutral-400" />
        </div>
        {total === 0 && !q && !categoria ? (
          <>
            <p className="font-semibold text-neutral-700 text-lg">Nenhum relatório publicado ainda</p>
            <p className="text-sm text-neutral-500 mt-1">Em breve novos relatórios serão disponibilizados.</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-neutral-700 text-lg">Nenhum resultado encontrado</p>
            <p className="text-sm text-neutral-500 mt-1">Tente outros termos ou remova os filtros aplicados.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Contador */}
      <p className="text-sm text-neutral-500 mb-6">
        Exibindo <span className="font-semibold text-neutral-700">{items.length}</span> de{' '}
        <span className="font-semibold text-neutral-700">{total}</span> relatório{total !== 1 ? 's' : ''}
      </p>

      {/* Grid de cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((rel) => (
          <RelatorioCardItem key={rel.id} rel={rel} />
        ))}
      </div>

      {/* Carregar mais / mensagem final */}
      <div className="mt-10 flex flex-col items-center gap-3">
        {hasMore ? (
          <Button
            variant="outline"
            size="md"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="min-w-[180px]"
          >
            {loadingMore ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Carregando...</>
            ) : (
              'Carregar mais'
            )}
          </Button>
        ) : (
          <p className="text-sm text-neutral-400 flex items-center gap-2">
            <span className="w-8 h-px bg-neutral-200" />
            Todos os relatórios carregados
            <span className="w-8 h-px bg-neutral-200" />
          </p>
        )}
      </div>
    </>
  );
}

function RelatorioCardItem({ rel }: { rel: RelatorioCard }) {
  return (
    <Link
      href={`/relatorios-tecnicos/${rel.slug}`}
      className="group bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md hover:border-primary-200 transition-all duration-200 flex flex-col"
    >
      {/* Imagem */}
      <div className="relative aspect-video bg-neutral-100 overflow-hidden flex-shrink-0">
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

        {/* Badge Exclusivo */}
        {rel.exclusivo_apoiador && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shadow">
            <Lock className="w-2.5 h-2.5" />
            Exclusivo
          </div>
        )}

        {/* Indicador de PDF */}
        {rel.pdf_url && !rel.exclusivo_apoiador && (
          <div className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm" title="PDF disponível">
            <Download className="w-3.5 h-3.5 text-primary-600" />
          </div>
        )}
        {rel.pdf_url && rel.exclusivo_apoiador && (
          <div className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm" title="PDF exclusivo para apoiadores">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-1">
        {rel.categorias?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {rel.categorias.slice(0, 2).map((cat) => (
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

        <h2 className="font-display font-bold text-neutral-900 text-base leading-snug mb-2 group-hover:text-primary-700 transition-colors line-clamp-2 flex-1">
          {rel.titulo}
        </h2>

        {rel.subtitulo && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{rel.subtitulo}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
          {rel.data_publicacao ? (
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(rel.data_publicacao)}
            </div>
          ) : <span />}

          {typeof rel.visualizacoes === 'number' && rel.visualizacoes > 0 && (
            <span className="text-xs text-neutral-400">
              {rel.visualizacoes} {rel.visualizacoes === 1 ? 'leitura' : 'leituras'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
