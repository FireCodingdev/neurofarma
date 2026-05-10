'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface RelatoriosFiltrosProps {
  categorias: string[];
  total: number;
  filtrado: number;
}

export function RelatoriosFiltros({ categorias, total, filtrado }: RelatoriosFiltrosProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get('q') ?? '';
  const categoriaAtiva = searchParams.get('categoria') ?? '';

  const [inputValue, setInputValue] = useState(q);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(q);
  }, [q]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
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

  const hasFilters = !!q || !!categoriaAtiva;

  return (
    <div className="mb-10 space-y-4">
      {/* Search input */}
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

      {/* Category pills */}
      {categorias.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mr-1">Filtrar:</span>
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
        </div>
      )}

      {/* Results count + clear */}
      {hasFilters && (
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>
            {filtrado === total
              ? `${total} resultado${total !== 1 ? 's' : ''}`
              : `${filtrado} de ${total} resultado${total !== 1 ? 's' : ''}`}
          </span>
          <button
            onClick={clearAll}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
