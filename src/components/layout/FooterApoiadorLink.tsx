'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export function FooterApoiadorLink() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLogado(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLogado(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Link
      href={logado ? '/apoiadores' : '/cadastro'}
      className="text-sm hover:text-primary-400 transition-colors"
    >
      Seja um apoiador
    </Link>
  );
}
