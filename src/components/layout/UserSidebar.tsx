'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  PackageSearch,
  ShoppingCart,
  Settings,
  LogOut,
  FlaskConical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const navItems = [
  { href: '/dashboard', label: 'Visão Geral', Icon: LayoutDashboard, exact: true },
  { href: '/dashboard/pedidos', label: 'Meus Pedidos', Icon: PackageSearch },
  { href: '/dashboard/novo-pedido', label: 'Novo Pedido', Icon: ShoppingCart },
  { href: '/dashboard/configuracoes', label: 'Configurações', Icon: Settings },
];

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-neutral-200 flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-neutral-100">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <FlaskConical className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-bold text-neutral-900 text-sm">Área do Paciente</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              )}
            >
              <Icon className={cn('w-4 h-4', active ? 'text-primary-600' : 'text-neutral-400')} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-neutral-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
