'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, ArrowRight, LogIn } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';

export function ApoiadoresSidebar() {
  const [logado, setLogado] = useState(false);
  const [checando, setChecando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLogado(!!session);
      setChecando(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLogado(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="sticky top-24">
      <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-0">
        <h3 className="font-display text-base font-semibold mb-2">
          Tem interesse em se tornar apoiador?
        </h3>
        <p className="text-sm text-primary-100 mb-4">
          Junte-se a quem fortalece a pesquisa farmacotécnica em cannabis medicinal no Brasil.
        </p>
        <Link
          href="/quem-somos"
          className="inline-flex items-center gap-1 text-sm text-white font-medium hover:text-primary-100 transition-colors mb-4"
        >
          Conheça nossa missão científica
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <p className="text-xs text-primary-200 font-medium mb-2">Falar conosco:</p>
        <div className="space-y-2">
          <a
            href="https://wa.me/5574981064385?text=Olá! Tenho interesse em me tornar apoiador da Neurofarma."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-white text-primary-700 hover:bg-primary-50 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contato via WhatsApp
          </a>

          {checando ? (
            <div className="w-full h-9 bg-white/10 rounded-lg animate-pulse" />
          ) : logado ? (
            <a
              href="mailto:neurofarmalab@hotmail.com"
              className="flex items-center justify-center gap-2 w-full border border-white/30 text-white hover:bg-white/10 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              Enviar e-mail
            </a>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full border border-white/30 text-white hover:bg-white/10 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Fazer login
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}
