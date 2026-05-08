'use client';

/**
 * AdminLink — substitui <Link> no painel admin.
 *
 * O Next.js 14 App Router mantém um Router Cache no cliente que serve
 * páginas antigas mesmo quando o servidor usa force-dynamic. Este componente
 * chama router.refresh() antes de cada navegação, invalidando esse cache e
 * garantindo que o servidor sempre execute o fetch de dados frescos.
 */

import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

interface AdminLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
}

export function AdminLink({ href, children, className, target }: AdminLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (target === '_blank') return; // deixa o browser tratar links externos
    e.preventDefault();
    router.refresh();           // invalida Router Cache
    router.push(href);          // navega com dados frescos
  };

  return (
    <a href={href} onClick={handleClick} className={className} target={target}>
      {children}
    </a>
  );
}
