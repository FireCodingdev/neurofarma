'use client';

import Link from 'next/link';
import { MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProdutoAcaoProps {
  produto: {
    id: string;
    nome: string;
    categoria: string;
  };
}

export function ProdutoAcao({ produto }: ProdutoAcaoProps) {
  const whatsappUrl = `https://wa.me/5574981064385?text=Olá! Tenho interesse no produto ${encodeURIComponent(produto.nome)}.`;
  const whatsappApoiadorUrl = `https://wa.me/5574981064385?text=Olá! Tenho interesse em me tornar apoiador da Neurofarma e apoiar a pesquisa em cannabis medicinal no Brasil.`;

  return (
    <div className="space-y-2">
      {/* WhatsApp sempre visível */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button
          className="w-full bg-white text-primary-700 hover:bg-primary-50 border-0"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contato via WhatsApp
        </Button>
      </a>

      {/* Tornar-se apoiador — vai para a página de apoiadores */}
      <Link href="/apoiadores">
        <Button
          variant="outline"
          className="w-full border-white/30 text-white hover:bg-white/10"
          size="sm"
        >
          <Heart className="w-4 h-4 mr-2" />
          Tornar-se apoiador
        </Button>
      </Link>

      {/* Botão direto WhatsApp apoiador */}
      <a href={whatsappApoiadorUrl} target="_blank" rel="noopener noreferrer">
        <Button
          className="w-full bg-white/15 text-white hover:bg-white/25 border border-white/30"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Torne-se apoiador via WhatsApp
        </Button>
      </a>
    </div>
  );
}