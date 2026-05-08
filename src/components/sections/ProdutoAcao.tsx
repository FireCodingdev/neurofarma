'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ModalPedido } from '@/components/sections/ModalPedido';
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
  const [pedidoFeito, setPedidoFeito] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLogado(!!session);
      setChecando(false);
    });
  }, []);

  const whatsappUrl = `https://wa.me/5574981064385?text=Olá! Tenho interesse no produto ${encodeURIComponent(produto.nome)}.`;

  return (
    <>
      <div className="space-y-2">
        {/* WhatsApp sempre visível */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button
            className="w-full bg-white text-primary-700 hover:bg-primary-50 border-0"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Solicitar via WhatsApp
          </Button>
        </a>

        {/* Botão condicional: Fazer Pedido (logado) ou Criar conta (não logado) */}
        {checando ? (
          <div className="w-full h-9 bg-white/10 rounded-lg animate-pulse" />
        ) : logado ? (
          <Button
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10"
            size="sm"
            onClick={() => setModalAberto(true)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {pedidoFeito ? 'Fazer outro pedido' : 'Fazer Pedido'}
          </Button>
        ) : (
          <Link href="/cadastro">
            <Button
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10"
              size="sm"
            >
              Criar conta
            </Button>
          </Link>
        )}
      </div>

      {modalAberto && (
        <ModalPedido
          produto={produto}
          onClose={() => setModalAberto(false)}
          onSuccess={() => setPedidoFeito(true)}
        />
      )}
    </>
  );
}
