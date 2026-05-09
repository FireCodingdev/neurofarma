'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DEFAULT_HOME_CONTENT, type NoticiasContent, type NoticiaItem } from '@/lib/home-content';

interface NoticiasProps {
  content?: NoticiasContent;
}

export function Noticias({ content = DEFAULT_HOME_CONTENT.noticias }: NoticiasProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { noticias } = content;

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % noticias.length);
  }, [noticias.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [noticias.length]);

  useEffect(() => {
    if (noticias.length <= 1 || paused) return;
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [noticias.length, paused, advance]);

  if (noticias.length === 0) return null;

  const safeIndex = activeIndex % noticias.length;
  const featured = noticias[safeIndex];
  const smallCount = Math.min(3, noticias.length - 1);
  const smallItems = Array.from({ length: smallCount }, (_, k) => {
    const idx = (safeIndex + 1 + k) % noticias.length;
    return { item: noticias[idx], idx };
  });

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-10">
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">
            {content.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">
            {content.titulo}
          </h2>
        </div>

        {/* Featured card */}
        <div
          className="mb-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <FeaturedCard
            key={safeIndex}
            item={featured}
          />

          {/* Progress bar */}
          {noticias.length > 1 && (
            <div className="mt-3 h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div
                key={`bar-${safeIndex}`}
                className="h-full bg-primary-500 rounded-full origin-left"
                style={{
                  animation: `newsProgress 5s linear forwards`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              />
            </div>
          )}
        </div>

        {/* Small cards row */}
        {smallItems.length > 0 && (
          <div
            className={`grid gap-5 ${
              smallItems.length === 1
                ? 'grid-cols-1 max-w-sm'
                : smallItems.length === 2
                ? 'grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-3'
            }`}
          >
            {smallItems.map(({ item, idx }) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="text-left w-full group"
              >
                <div className="relative rounded-xl overflow-hidden aspect-video mb-3">
                  {item.imagem_url ? (
                    <img
                      src={item.imagem_url}
                      alt={item.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100" />
                  )}
                  {item.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-neutral-900 text-sm leading-snug mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {item.titulo}
                </h4>
                {item.descricao_curta && (
                  <p className="text-neutral-500 text-xs flex items-start gap-1.5 line-clamp-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-1" />
                    {item.descricao_curta}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Navigation dots */}
        {noticias.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {noticias.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Ir para notícia ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === safeIndex
                    ? 'w-6 h-2 bg-primary-500'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ item }: { item: NoticiaItem }) {
  const inner = (
    <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 lg:h-[26rem] group cursor-pointer animate-fade-in">
      {item.imagem_url ? (
        <img
          src={item.imagem_url}
          alt={item.titulo}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-neutral-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {item.badge && (
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-bold uppercase tracking-wide shadow">
          {item.badge}
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <h3 className="text-white font-display font-bold text-xl sm:text-2xl lg:text-3xl mb-2 leading-snug">
          {item.titulo}
        </h3>
        {item.descricao_curta && (
          <p className="text-neutral-200 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
            {item.descricao_curta}
          </p>
        )}
        {item.link && (
          <span className="inline-block mt-3 text-primary-300 text-sm font-semibold group-hover:text-primary-200 transition-colors">
            Ler mais →
          </span>
        )}
      </div>
    </div>
  );

  if (item.link) {
    return (
      <Link href={item.link} target="_blank" rel="noopener noreferrer">
        {inner}
      </Link>
    );
  }
  return inner;
}
