'use client';

import { useEffect } from 'react';

export function RelatorioViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/relatorios/${slug}/view`, { method: 'POST' }).catch(() => {});
  }, [slug]);
  return null;
}
