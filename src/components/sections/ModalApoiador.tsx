'use client';

import { useState } from 'react';
import { X, Heart, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ModalApoiadorProps {
  produto: {
    id: string;
    nome: string;
    categoria: string;
  };
  onClose: () => void;
}

const BENEFICIOS = [
  'Acesso antecipado a relatórios técnicos exclusivos',
  'Suporte direto à pesquisa farmacotécnica brasileira',
  'Participação em atualizações científicas periódicas',
  'Canal direto com a equipe Neurofarma',
];

export function ModalApoiador({ produto, onClose }: ModalApoiadorProps) {
  const [enviado, setEnviado] = useState(false);

  const whatsappUrl = `https://wa.me/5574981064385?text=Olá! Tenho interesse em me tornar apoiador da Neurofarma. Vim pela página do produto ${encodeURIComponent(produto.nome)}.`;

  const handleWhatsApp = () => {
    setEnviado(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-white">Tornar-se Apoiador</h2>
                <p className="text-primary-100 text-sm mt-0.5">Neurofarma · Cannabis Medicinal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {enviado ? (
          <div className="px-6 py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900">Redirecionando!</h3>
            <p className="text-neutral-500 text-sm mt-2">
              Abrindo o WhatsApp para conectar você com nossa equipe. Obrigado pelo interesse!
            </p>
          </div>
        ) : (
          <div className="px-6 py-6 space-y-5">

            <div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Ao se tornar apoiador, você fortalece diretamente a pesquisa farmacotécnica em cannabis medicinal no Brasil e tem acesso a benefícios exclusivos.
              </p>
            </div>

            {/* Benefícios */}
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
              <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-3">
                Benefícios do apoiador
              </p>
              <ul className="space-y-2">
                {BENEFICIOS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Produto de interesse */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Produto de interesse
              </p>
              <p className="text-sm font-medium text-neutral-900">{produto.nome}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{produto.categoria}</p>
            </div>

            {/* CTA WhatsApp */}
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white"
              size="md"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar com a equipe via WhatsApp
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-xs text-center text-neutral-400">
              Nossa equipe entrará em contato para apresentar os planos de apoio disponíveis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
