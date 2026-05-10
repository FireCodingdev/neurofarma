'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface RelatoriosFiltrosProps {
  categorias: string[];
}

const ORDENS = [
  { value: 'recentes',   label: 'Mais recentes' },
  { value: 'antigos',    label: 'Mais antigos'  },
  { value: 'mais-lidos', label: 'Mais lidos'    },
] as const;

export function RelatoriosFiltros({ categorias }: RelatoriosFiltrosProps) {
  const searchParams   = useSearchParams();
  const router         = useRouter();
  const pathname       = usePathname();

  const q              = searchParams.get('q')        ?? '';
  const categoriaAtiva = searchParams.get('categoria') ?? '';
  const ordemAtiva     = searchParams.get('ordem')    ?? 'recentes';

  const [inputValue, setInputValue] = useState(q);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setInputValue(q); }, [q]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else        params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearchChange(value: string) {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setParam('q', value), 350);
  }

  function handleCategoria(cat: string) {
    setParam('categoria', cat === categoriaAtiva ? '' : cat);
  }

  function clearAll() {
    setInputValue('');
    router.replace(pathname, { scroll: false });
  }

  const hasFilters = !!q || !!categoriaAtiva || ordemAtiva !== 'recentes';

  return (
    <div className="mb-8 space-y-4">
      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar por título ou descrição..."
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition"
        />
        {inputValue && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-neutral-500" />
          </button>
        )}
      </div>

      {/* Categorias + Ordenação */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Pills de categoria */}
        {categorias.length > 0 && (
          <>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mr-1 shrink-0">
              Filtrar:
            </span>
            <button
              onClick={() => setParam('categoria', '')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                !categoriaAtiva
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-700'
              }`}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoria(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                  categoriaAtiva === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-700'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Separador visual */}
            <span className="hidden sm:inline-block w-px h-5 bg-neutral-200 mx-1" />
          </>
        )}

        {/* Dropdown de ordenação */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest shrink-0 hidden sm:inline">
            Ordenar por:
          </span>
          <select
            value={ordemAtiva}
            onChange={(e) => setParam('ordem', e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-sm"
          >
            {ORDENS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Limpar filtros */}
      {hasFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearAll}
            className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
