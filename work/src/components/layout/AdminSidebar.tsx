'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FlaskConical,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Globe,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const tabs = [
  {
    group: 'Principal',
    items: [
      { href: '/admin', label: 'Dashboard', Icon: LayoutDashboard, exact: true },
    ],
  },
  {
    group: 'Catálogo',
    items: [
      { href: '/admin/produtos', label: 'Produtos', Icon: FlaskConical },
    ],
  },
  {
    group: 'Conteúdo do site',
    items: [
      { href: '/admin/conteudo', label: 'Conteúdo da Home', Icon: FileText },
    ],
  },
  {
    group: 'Operação',
    items: [
      { href: '/admin/pedidos', label: 'Pedidos', Icon: ShoppingCart },
      { href: '/admin/usuarios', label: 'Usuários', Icon: Users },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { href: '/admin/configuracoes', label: 'Configurações', Icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-neutral-950 border-r border-white/5 min-h-screen">
      {/* Logo + brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group mb-1">
          <Image
            src="/imagens/logo.png"
            alt="NEUROFARMA"
            width={140}
            height={48}
            className="h-10 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </Link>
        <span className="text-[11px] font-semibold text-primary-400 uppercase tracking-widest ml-0.5">
          Painel Administrativo
        </span>
      </div>

      {/* Tab groups */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {tabs.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-3 mb-1.5">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ href, label, Icon, ...rest }) => {
                const exact = 'exact' in rest ? rest.exact : false;
                const active = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                      active
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-white' : 'text-neutral-500')} />
                    <span>{label}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Globe className="w-4 h-4 text-neutral-500" />
          Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
