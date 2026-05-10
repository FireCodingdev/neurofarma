'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ModalApoiador } from '@/components/sections/ModalApoiador';
import { supabase } from '@/lib/supabase';

interface ProdutoAcaoProps {
  produto: {
    id: string;
    nome: string;
    categoria: string;
  };
}

export function ProdutoAcao({ produto }: ProdutoAcaoProps) {
  const [logado, setLogado] = useState(false);
  const [checando, setChecando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLogado(!!session);
      setChecando(false);
    });
  }, []);

  const whatsappApoiadorUrl = `https://wa.me/5574981064385?text=Olá! Tenho interesse em me tornar apoiador da Neurofarma. Vim pela página do produto ${encodeURIComponent(produto.nome)}.`;

  return (
    <>
      <div className="space-y-2">

        {/* Botão WhatsApp apoiador (renomeado, sempre visível) */}
        <a href={whatsappApoiadorUrl} target="_blank" rel="noopener noreferrer">
          <Button
            className="w-full bg-white text-primary-700 hover:bg-primary-50 border-0"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Torne-se apoiador via WhatsApp
          </Button>
        </a>

        {/* Botão Tornar-se apoiador — abre modal (logado) ou redireciona para cadastro */}
        {checando ? (
          <div className="w-full h-9 bg-white/10 rounded-lg animate-pulse" />
        ) : logado ? (
          <Button
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10"
            size="sm"
            onClick={() => setModalAberto(true)}
          >
            <Heart className="w-4 h-4 mr-2" />
            Tornar-se apoiador
          </Button>
        ) : (
          <Link href="/cadastro">
            <Button
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10"
              size="sm"
            >
              <Heart className="w-4 h-4 mr-2" />
              Tornar-se apoiador
            </Button>
          </Link>
        )}

      </div>

      {modalAberto && (
        <ModalApoiador
          produto={produto}
          onClose={() => setModalAberto(false)}
        />
      )}
    </>
  );
}