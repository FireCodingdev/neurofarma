'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface GaleriaLightboxProps {
  imagens: string[];
  nomeProduto: string;
}

export function GaleriaLightbox({ imagens, nomeProduto }: GaleriaLightboxProps) {
  const [aberto, setAberto] = useState(false);
  const [indice, setIndice] = useState(0);

  const anterior = useCallback(() => {
    setIndice((i) => (i - 1 + imagens.length) % imagens.length);
  }, [imagens.length]);

  const proximo = useCallback(() => {
    setIndice((i) => (i + 1) % imagens.length);
  }, [imagens.length]);

  const abrir = (i: number) => {
    setIndice(i);
    setAberto(true);
  };

  useEffect(() => {
    if (!aberto) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
      if (e.key === 'ArrowLeft') anterior();
      if (e.key === 'ArrowRight') proximo();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [aberto, anterior, proximo]);

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [aberto]);

  return (
    <>
      <Card className="p-0 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-1">
          {imagens.map((url, i) => (
            <button
              key={i}
              onClick={() => abrir(i)}
              className="block overflow-hidden bg-neutral-100 cursor-zoom-in rounded-lg"
              style={{ aspectRatio: '1/1' }}
            >
              <img
                src={url}
                alt={`${nomeProduto} - foto ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </Card>

      {aberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setAberto(false)}
        >
          {/* Fechar */}
          <button
            onClick={() => setAberto(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Contador */}
          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {indice + 1} / {imagens.length}
          </p>

          {/* Seta esquerda */}
          {imagens.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); anterior(); }}
              className="absolute left-3 sm:left-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Imagem */}
          <div
            className="max-w-5xl max-h-[85vh] px-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={indice}
              src={imagens[indice]}
              alt={`${nomeProduto} - foto ${indice + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-fade-in"
            />
          </div>

          {/* Seta direita */}
          {imagens.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); proximo(); }}
              className="absolute right-3 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Miniaturas */}
          {imagens.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {imagens.map((url, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndice(i); }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === indice ? 'border-white scale-110' : 'border-white/30 opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
